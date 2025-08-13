"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToiletMaintenanceSchedulerService = exports.ToiletMaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const toilet_maintenance_entity_1 = require("./entities/toilet_maintenance.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const typeorm_2 = require("typeorm");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const chemical_toilets_service_1 = require("../chemical_toilets/chemical_toilets.service");
const schedule_1 = require("@nestjs/schedule");
const contractual_conditions_entity_1 = require("../contractual_conditions/entities/contractual_conditions.entity");
let ToiletMaintenanceService = class ToiletMaintenanceService {
    constructor(maintenanceRepository, toiletsRepository, empleadoRepository, chemicalToiletsService) {
        this.maintenanceRepository = maintenanceRepository;
        this.toiletsRepository = toiletsRepository;
        this.empleadoRepository = empleadoRepository;
        this.chemicalToiletsService = chemicalToiletsService;
    }
    calculateMaintenanceDays(fechaInicio, fechaFin, periodicidad) {
        if (!fechaInicio || !fechaFin) {
            throw new common_1.BadRequestException('Fechas de inicio o fin no válidas');
        }
        const startDate = new Date(fechaInicio);
        const endDate = new Date(fechaFin);
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
        }
        const maintenanceDates = [];
        let currentDate = new Date(startDate);
        maintenanceDates.push(new Date(currentDate));
        let intervalDays;
        switch (periodicidad) {
            case contractual_conditions_entity_1.Periodicidad.DIARIA:
                intervalDays = 1;
                break;
            case contractual_conditions_entity_1.Periodicidad.DOS_VECES_SEMANA:
                intervalDays = 3.5;
                break;
            case contractual_conditions_entity_1.Periodicidad.TRES_VECES_SEMANA:
                intervalDays = 2.33;
                break;
            case contractual_conditions_entity_1.Periodicidad.CUATRO_VECES_SEMANA:
                intervalDays = 1.75;
                break;
            case contractual_conditions_entity_1.Periodicidad.SEMANAL:
                intervalDays = 7;
                break;
            case contractual_conditions_entity_1.Periodicidad.QUINCENAL:
                intervalDays = 15;
                break;
            case contractual_conditions_entity_1.Periodicidad.MENSUAL:
                intervalDays = 30;
                break;
            case contractual_conditions_entity_1.Periodicidad.ANUAL:
                intervalDays = 365;
                break;
            default:
                throw new common_1.BadRequestException('Periodicidad no válida');
        }
        while (true) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + intervalDays);
            if (nextDate > endDate) {
                break;
            }
            maintenanceDates.push(new Date(nextDate));
            currentDate = nextDate;
        }
        return maintenanceDates;
    }
    async create(createMaintenanceDto) {
        const toilet = await this.toiletsRepository.findOne({
            where: { baño_id: createMaintenanceDto.baño_id },
        });
        if (!toilet) {
            throw new common_1.NotFoundException(`Baño con ID ${createMaintenanceDto.baño_id} no encontrado`);
        }
        const empleado = await this.empleadoRepository.findOne({
            where: { id: createMaintenanceDto.empleado_id },
        });
        if (!empleado) {
            throw new common_1.NotFoundException(`Empleado con ID ${createMaintenanceDto.empleado_id} no encontrado`);
        }
        if (toilet.estado !== resource_states_enum_1.ResourceState.DISPONIBLE) {
            throw new common_1.BadRequestException(`El baño químico no está disponible para mantenimiento. Estado actual: ${toilet.estado}`);
        }
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const maintenanceDate = new Date(createMaintenanceDto.fecha_mantenimiento);
        maintenanceDate.setHours(0, 0, 0, 0);
        if (maintenanceDate <= now) {
            await this.chemicalToiletsService.update(toilet.baño_id, {
                estado: resource_states_enum_1.ResourceState.MANTENIMIENTO,
            });
            toilet.estado = resource_states_enum_1.ResourceState.MANTENIMIENTO;
        }
        const maintenance = this.maintenanceRepository.create({
            fecha_mantenimiento: createMaintenanceDto.fecha_mantenimiento,
            tipo_mantenimiento: createMaintenanceDto.tipo_mantenimiento,
            descripcion: createMaintenanceDto.descripcion,
            costo: createMaintenanceDto.costo,
            toilet,
            tecnicoResponsable: empleado,
            completado: false,
        });
        return await this.maintenanceRepository.save(maintenance);
    }
    async completeMaintenace(id) {
        const maintenance = await this.findById(id);
        maintenance.completado = true;
        maintenance.fechaCompletado = new Date();
        if (maintenance.toilet) {
            await this.chemicalToiletsService.update(maintenance.toilet.baño_id, {
                estado: resource_states_enum_1.ResourceState.DISPONIBLE,
            });
            maintenance.toilet.estado = resource_states_enum_1.ResourceState.DISPONIBLE;
        }
        else {
            const maintenanceWithToilet = await this.maintenanceRepository.findOne({
                where: { mantenimiento_id: id },
                relations: ['toilet'],
            });
            if (maintenanceWithToilet && maintenanceWithToilet.toilet) {
                await this.chemicalToiletsService.update(maintenanceWithToilet.toilet.baño_id, {
                    estado: resource_states_enum_1.ResourceState.DISPONIBLE,
                });
                maintenance.toilet = maintenanceWithToilet.toilet;
            }
        }
        return this.maintenanceRepository.save(maintenance);
    }
    async hasScheduledMaintenance(banoId, fecha) {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);
        const maintenanceCount = await this.maintenanceRepository.count({
            where: {
                toilet: { baño_id: banoId },
                fecha_mantenimiento: (0, typeorm_2.Between)(startOfDay, endOfDay),
                completado: false,
            },
        });
        return maintenanceCount > 0;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, search } = paginationDto;
        const queryBuilder = this.maintenanceRepository
            .createQueryBuilder('maintenance')
            .leftJoinAndSelect('maintenance.toilet', 'toilet')
            .leftJoinAndSelect('maintenance.tecnicoResponsable', 'empleado');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            queryBuilder.where(`LOWER(UNACCENT(maintenance.tipo_mantenimiento)) LIKE :term0
        OR LOWER(UNACCENT(CAST(maintenance.completado AS TEXT))) LIKE :term0
        OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :term0
        OR LOWER(UNACCENT(toilet.modelo)) LIKE :term0
        OR LOWER(UNACCENT(empleado.nombre)) LIKE :term0
        OR LOWER(UNACCENT(empleado.apellido)) LIKE :term0
        OR LOWER(UNACCENT(CONCAT(empleado.nombre, ' ', empleado.apellido))) LIKE :term0`, { term0: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                queryBuilder.andWhere(`LOWER(UNACCENT(maintenance.tipo_mantenimiento)) LIKE :term${i}
          OR LOWER(UNACCENT(CAST(maintenance.completado AS TEXT))) LIKE :term${i}
          OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :term${i}
          OR LOWER(UNACCENT(toilet.modelo)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.nombre)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.apellido)) LIKE :term${i}
          OR LOWER(UNACCENT(CONCAT(empleado.nombre, ' ', empleado.apellido))) LIKE :term${i}`, { [`term${i}`]: `%${searchTerms[i]}%` });
            }
        }
        queryBuilder
            .orderBy('maintenance.mantenimiento_id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async getUpcomingMaintenances() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.maintenanceRepository.find({
            where: {
                fecha_mantenimiento: (0, typeorm_2.Between)(today, new Date('9999-12-31')),
                completado: false,
            },
            relations: ['toilet', 'tecnicoResponsable'],
            order: {
                fecha_mantenimiento: 'ASC',
            },
        });
    }
    async findById(mantenimiento_id) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { mantenimiento_id },
            relations: ['toilet', 'tecnicoResponsable'],
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Mantenimiento con ID ${mantenimiento_id} no encontrado`);
        }
        return maintenance;
    }
    async update(mantenimiento_id, updateMaintenanceDto) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { mantenimiento_id },
            relations: ['toilet', 'tecnicoResponsable'],
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Mantenimiento con ID ${mantenimiento_id} no encontrado`);
        }
        if (updateMaintenanceDto.baño_id) {
            const toilet = await this.toiletsRepository.findOne({
                where: { baño_id: updateMaintenanceDto.baño_id },
            });
            if (!toilet) {
                throw new common_1.NotFoundException(`Baño con ID ${updateMaintenanceDto.baño_id} no encontrado`);
            }
            maintenance.toilet = toilet;
        }
        if (updateMaintenanceDto.empleado_id) {
            const empleado = await this.empleadoRepository.findOne({
                where: { id: updateMaintenanceDto.empleado_id },
            });
            if (!empleado) {
                throw new common_1.NotFoundException(`Empleado con ID ${updateMaintenanceDto.empleado_id} no encontrado`);
            }
            maintenance.tecnicoResponsable = empleado;
        }
        const { empleado_id, ...updateData } = updateMaintenanceDto;
        Object.assign(maintenance, updateData);
        return await this.maintenanceRepository.save(maintenance);
    }
    async delete(mantenimiento_id) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { mantenimiento_id },
        });
        if (!maintenance) {
            throw new common_1.NotFoundException(`Mantenimiento con ID ${mantenimiento_id} no encontrado`);
        }
        await this.maintenanceRepository.delete(mantenimiento_id);
    }
    async getMantenimientosStats(baño_id) {
        const maintenances = await this.maintenanceRepository.find({
            where: { toilet: { baño_id } },
            relations: ['toilet', 'tecnicoResponsable'],
        });
        if (maintenances.length === 0) {
            throw new common_1.NotFoundException(`No se encontraron mantenimientos para el baño con ID ${baño_id}`);
        }
        const totalMantenimientos = maintenances.length;
        const costoTotal = maintenances.reduce((sum, m) => sum + Number(m.costo), 0);
        const costoPromedio = costoTotal / totalMantenimientos;
        const tiposMantenimiento = maintenances.reduce((acc, m) => {
            acc[m.tipo_mantenimiento] = (acc[m.tipo_mantenimiento] || 0) + 1;
            return acc;
        }, {});
        return {
            totalMantenimientos,
            costoTotal,
            costoPromedio,
            tiposMantenimiento,
            ultimoMantenimiento: maintenances.sort((a, b) => new Date(b.fecha_mantenimiento).getTime() -
                new Date(a.fecha_mantenimiento).getTime())[0],
        };
    }
};
exports.ToiletMaintenanceService = ToiletMaintenanceService;
exports.ToiletMaintenanceService = ToiletMaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(toilet_maintenance_entity_1.ToiletMaintenance)),
    __param(1, (0, typeorm_1.InjectRepository)(chemical_toilet_entity_1.ChemicalToilet)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Empleado)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        chemical_toilets_service_1.ChemicalToiletsService])
], ToiletMaintenanceService);
let ToiletMaintenanceSchedulerService = class ToiletMaintenanceSchedulerService {
    constructor(toiletMaintenanceRepository, chemicalToiletsService) {
        this.toiletMaintenanceRepository = toiletMaintenanceRepository;
        this.chemicalToiletsService = chemicalToiletsService;
    }
    async handleScheduledMaintenances() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todaysMaintenances = await this.toiletMaintenanceRepository.find({
            where: {
                fecha_mantenimiento: (0, typeorm_2.Between)(today, tomorrow),
                completado: false,
            },
            relations: ['toilet', 'tecnicoResponsable'],
        });
        for (const maintenance of todaysMaintenances) {
            if (maintenance.toilet) {
                await this.chemicalToiletsService.update(maintenance.toilet.baño_id, {
                    estado: resource_states_enum_1.ResourceState.MANTENIMIENTO,
                });
            }
        }
    }
};
exports.ToiletMaintenanceSchedulerService = ToiletMaintenanceSchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceSchedulerService.prototype, "handleScheduledMaintenances", null);
exports.ToiletMaintenanceSchedulerService = ToiletMaintenanceSchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(toilet_maintenance_entity_1.ToiletMaintenance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        chemical_toilets_service_1.ChemicalToiletsService])
], ToiletMaintenanceSchedulerService);
//# sourceMappingURL=toilet_maintenance.service.js.map