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
var VehicleMaintenanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceSchedulerService = exports.VehicleMaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_maintenance_record_entity_1 = require("./entities/vehicle_maintenance_record.entity");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const schedule_1 = require("@nestjs/schedule");
let VehicleMaintenanceService = VehicleMaintenanceService_1 = class VehicleMaintenanceService {
    constructor(maintenanceRepository, vehiclesService) {
        this.maintenanceRepository = maintenanceRepository;
        this.vehiclesService = vehiclesService;
        this.logger = new common_1.Logger(VehicleMaintenanceService_1.name);
    }
    async create(createMaintenanceDto) {
        this.logger.log(`Creando registro de mantenimiento para vehículo: ${createMaintenanceDto.vehiculoId}`);
        const vehicle = await this.vehiclesService.findOne(createMaintenanceDto.vehiculoId);
        if (!createMaintenanceDto.fechaMantenimiento) {
            if (vehicle.estado !== resource_states_enum_1.ResourceState.DISPONIBLE &&
                vehicle.estado !== resource_states_enum_1.ResourceState.ASIGNADO) {
                throw new common_1.BadRequestException(`Solo vehículos en estado DISPONIBLE o ASIGNADO pueden tener mantenimientos sin fecha específica. Estado actual: ${vehicle.estado}`);
            }
        }
        else {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const maintenanceDate = new Date(createMaintenanceDto.fechaMantenimiento);
            maintenanceDate.setHours(0, 0, 0, 0);
            if (maintenanceDate <= now) {
                if (vehicle.estado !== resource_states_enum_1.ResourceState.DISPONIBLE) {
                    throw new common_1.BadRequestException(`El vehículo no está disponible para mantenimiento inmediato. Estado actual: ${vehicle.estado}`);
                }
                await this.vehiclesService.changeStatus(vehicle.id, resource_states_enum_1.ResourceState.MANTENIMIENTO);
                vehicle.estado = resource_states_enum_1.ResourceState.MANTENIMIENTO.toString();
            }
            else {
                if (vehicle.estado !== resource_states_enum_1.ResourceState.DISPONIBLE &&
                    vehicle.estado !== resource_states_enum_1.ResourceState.ASIGNADO) {
                    throw new common_1.BadRequestException(`Solo vehículos en estado DISPONIBLE o ASIGNADO pueden programar mantenimientos futuros. Estado actual: ${vehicle.estado}`);
                }
            }
        }
        const maintenanceRecord = this.maintenanceRepository.create(createMaintenanceDto);
        maintenanceRecord.vehicle = vehicle;
        return this.maintenanceRepository.save(maintenanceRecord);
    }
    async completeMaintenace(id) {
        const record = await this.findOne(id);
        record.completado = true;
        record.fechaCompletado = new Date();
        await this.vehiclesService.changeStatus(record.vehiculoId, resource_states_enum_1.ResourceState.DISPONIBLE);
        if (record.vehicle) {
            record.vehicle.estado = resource_states_enum_1.ResourceState.DISPONIBLE.toString();
        }
        else {
            record.vehicle = await this.vehiclesService.findOne(record.vehiculoId);
        }
        return this.maintenanceRepository.save(record);
    }
    async hasScheduledMaintenance(vehiculoId, fecha) {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);
        const maintenanceCount = await this.maintenanceRepository.count({
            where: {
                vehiculoId,
                fechaMantenimiento: (0, typeorm_2.Between)(startOfDay, endOfDay),
                completado: false,
            },
        });
        return maintenanceCount > 0;
    }
    async findAll(paginationDto, search) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const query = this.maintenanceRepository
            .createQueryBuilder('maintenance')
            .leftJoinAndSelect('maintenance.vehicle', 'vehicle')
            .orderBy('maintenance.fechaMantenimiento', 'DESC', 'NULLS LAST')
            .skip(skip)
            .take(limit);
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            query.where(`(LOWER(vehicle.modelo) LIKE :term0 OR
          LOWER(vehicle.placa) LIKE :term0 OR
          LOWER(vehicle.marca) LIKE :term0 OR
          LOWER(maintenance.descripcion) LIKE :term0 OR
          LOWER(maintenance.tipoMantenimiento) LIKE :term0)`, { term0: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                query.andWhere(`(LOWER(vehicle.modelo) LIKE :term${i} OR
            LOWER(vehicle.placa) LIKE :term${i} OR
            LOWER(vehicle.marca) LIKE :term${i} OR
            LOWER(maintenance.descripcion) LIKE :term${i} OR
            LOWER(maintenance.tipoMantenimiento) LIKE :term${i})`, { [`term${i}`]: `%${searchTerms[i]}%` });
            }
        }
        const [data, total] = await query.getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        this.logger.log(`Buscando registro de mantenimiento con id: ${id}`);
        const maintenanceRecord = await this.maintenanceRepository.findOne({
            where: { id },
            relations: ['vehicle'],
        });
        if (!maintenanceRecord) {
            throw new common_1.NotFoundException(`Registro de mantenimiento con id ${id} no encontrado`);
        }
        return maintenanceRecord;
    }
    async findByVehicle(vehiculoId) {
        this.logger.log(`Buscando registros de mantenimiento para vehículo: ${vehiculoId}`);
        await this.vehiclesService.findOne(vehiculoId);
        return this.maintenanceRepository
            .createQueryBuilder('maintenance')
            .leftJoinAndSelect('maintenance.vehicle', 'vehicle')
            .where('maintenance.vehiculoId = :vehiculoId', { vehiculoId })
            .orderBy('maintenance.fechaMantenimiento', 'DESC', 'NULLS LAST')
            .getMany();
    }
    async findUpcomingMaintenances() {
        this.logger.log('Recuperando próximos mantenimientos');
        const today = new Date();
        return this.maintenanceRepository.find({
            where: {
                proximoMantenimiento: (0, typeorm_2.MoreThanOrEqual)(today),
            },
            relations: ['vehicle'],
            order: { proximoMantenimiento: 'ASC' },
        });
    }
    async update(id, updateMaintenanceDto) {
        this.logger.log(`Actualizando registro de mantenimiento con id: ${id}`);
        const maintenanceRecord = await this.findOne(id);
        Object.assign(maintenanceRecord, updateMaintenanceDto);
        return this.maintenanceRepository.save(maintenanceRecord);
    }
    async remove(id) {
        this.logger.log(`Eliminando registro de mantenimiento con id: ${id}`);
        const maintenanceRecord = await this.findOne(id);
        await this.maintenanceRepository.remove(maintenanceRecord);
    }
};
exports.VehicleMaintenanceService = VehicleMaintenanceService;
exports.VehicleMaintenanceService = VehicleMaintenanceService = VehicleMaintenanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_maintenance_record_entity_1.VehicleMaintenanceRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        vehicles_service_1.VehiclesService])
], VehicleMaintenanceService);
let MaintenanceSchedulerService = class MaintenanceSchedulerService {
    constructor(vehicleMaintenanceRepository, vehiclesService) {
        this.vehicleMaintenanceRepository = vehicleMaintenanceRepository;
        this.vehiclesService = vehiclesService;
    }
    async handleScheduledMaintenances() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todaysMaintenances = await this.vehicleMaintenanceRepository.find({
            where: {
                fechaMantenimiento: (0, typeorm_2.Between)(today, tomorrow),
                completado: false,
            },
            relations: ['vehicle'],
        });
        for (const maintenance of todaysMaintenances) {
            await this.vehiclesService.changeStatus(maintenance.vehiculoId, resource_states_enum_1.ResourceState.MANTENIMIENTO);
        }
    }
};
exports.MaintenanceSchedulerService = MaintenanceSchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaintenanceSchedulerService.prototype, "handleScheduledMaintenances", null);
exports.MaintenanceSchedulerService = MaintenanceSchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_maintenance_record_entity_1.VehicleMaintenanceRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        vehicles_service_1.VehiclesService])
], MaintenanceSchedulerService);
//# sourceMappingURL=vehicle_maintenance.service.js.map