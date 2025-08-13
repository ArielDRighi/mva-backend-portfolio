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
var VehiclesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
let VehiclesService = VehiclesService_1 = class VehiclesService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
        this.logger = new common_1.Logger(VehiclesService_1.name);
    }
    async create(createVehicleDto) {
        this.logger.log(`Creando vehículo con placa: ${createVehicleDto.placa}`);
        const existingVehicle = await this.vehicleRepository.findOne({
            where: { placa: createVehicleDto.placa },
        });
        if (existingVehicle) {
            throw new common_1.ConflictException(`Ya existe un vehículo con la placa ${createVehicleDto.placa}`);
        }
        const vehicle = this.vehicleRepository.create(createVehicleDto);
        return this.vehicleRepository.save(vehicle);
    }
    async findAll(page = 1, limit = 10, search) {
        this.logger.log('Recuperando todos los vehículos');
        const queryBuilder = this.vehicleRepository.createQueryBuilder('vehicle');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            queryBuilder.where(`(LOWER(UNACCENT(vehicle.placa)) LIKE :searchTerm
        OR LOWER(UNACCENT(vehicle.marca)) LIKE :searchTerm
        OR LOWER(UNACCENT(vehicle.modelo)) LIKE :searchTerm
        OR LOWER(UNACCENT(vehicle.estado)) LIKE :searchTerm)`, { searchTerm: `%${search.toLowerCase()}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                queryBuilder.andWhere(`(LOWER(UNACCENT(vehicle.placa)) LIKE :searchTerm${i}
          OR LOWER(UNACCENT(vehicle.marca)) LIKE :searchTerm${i}
          OR LOWER(UNACCENT(vehicle.modelo)) LIKE :searchTerm${i}
          OR LOWER(UNACCENT(vehicle.estado)) LIKE :searchTerm${i})`, { [`searchTerm${i}`]: `%${searchTerms[i]}%` });
            }
        }
        queryBuilder.orderBy('vehicle.id', 'ASC');
        const [vehicles, total] = await Promise.all([
            queryBuilder
                .skip((page - 1) * limit)
                .take(limit)
                .getMany(),
            queryBuilder.getCount(),
        ]);
        return {
            data: vehicles,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        this.logger.log(`Buscando vehículo con id: ${id}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: ['maintenanceRecords'],
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehículo con id ${id} no encontrado`);
        }
        return vehicle;
    }
    async findByPlaca(placa) {
        this.logger.log(`Buscando vehículo con placa: ${placa}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { placa },
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehículo con placa ${placa} no encontrado`);
        }
        return vehicle;
    }
    async update(id, updateVehicleDto) {
        this.logger.log(`Actualizando vehículo con id: ${id}`);
        const vehicle = await this.findOne(id);
        if (updateVehicleDto.placa && updateVehicleDto.placa !== vehicle.placa) {
            const existingVehicle = await this.vehicleRepository.findOne({
                where: { placa: updateVehicleDto.placa },
            });
            if (existingVehicle) {
                throw new common_1.ConflictException(`Ya existe un vehículo con la placa ${updateVehicleDto.placa}`);
            }
        }
        Object.assign(vehicle, updateVehicleDto);
        return this.vehicleRepository.save(vehicle);
    }
    async remove(id) {
        this.logger.log(`Eliminando vehículo con id: ${id}`);
        const vehicle = await this.findOne(id);
        const vehicleWithAssignments = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .leftJoinAndSelect('asignacion_recursos', 'asignacion', 'asignacion.vehiculo_id = vehicle.id')
            .leftJoinAndSelect('servicios', 'servicio', 'asignacion.servicio_id = servicio.servicio_id')
            .where('vehicle.id = :id', { id })
            .andWhere('asignacion.vehiculo_id IS NOT NULL')
            .getOne();
        if (vehicleWithAssignments) {
            throw new common_1.BadRequestException(`El vehículo no puede ser eliminado ya que se encuentra asignado a uno o más servicios.`);
        }
        if (vehicle.maintenanceRecords &&
            vehicle.maintenanceRecords.some((record) => !record.completado)) {
            throw new common_1.BadRequestException(`El vehículo no puede ser eliminado ya que tiene mantenimientos programados pendientes.`);
        }
        await this.vehicleRepository.remove(vehicle);
        return { message: `El vehículo id: ${id} ha sido eliminado correctamente` };
    }
    async changeStatus(id, estado) {
        this.logger.log(`Cambiando estado del vehículo ${id} a ${estado}`);
        const vehicle = await this.findOne(id);
        vehicle.estado = estado;
        return this.vehicleRepository.save(vehicle);
    }
    async findByEstado(estado) {
        this.logger.log(`Buscando vehículos con estado: ${estado}`);
        return this.vehicleRepository.find({
            where: { estado },
        });
    }
    async getTotalVehicles() {
        const total = await this.vehicleRepository.count();
        const totalDisponibles = await this.vehicleRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.DISPONIBLE },
        });
        const totalMantenimiento = await this.vehicleRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.MANTENIMIENTO },
        });
        const totalAsignado = await this.vehicleRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.ASIGNADO },
        });
        return {
            total,
            totalDisponibles,
            totalMantenimiento,
            totalAsignado,
        };
    }
    async getExpiringDocuments(days = 30, page = 1, limit = 10) {
        this.logger.log(`Buscando vehículos con seguros y VTV próximos a vencer en ${days} días (página ${page}, límite ${limit})`);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);
        const segurosQueryBuilder = this.vehicleRepository
            .createQueryBuilder('vehicle')
            .where('vehicle.fechaVencimientoSeguro IS NOT NULL')
            .andWhere('vehicle.fechaVencimientoSeguro BETWEEN :today AND :futureDate', {
            today: today.toISOString().split('T')[0],
            futureDate: futureDate.toISOString().split('T')[0],
        })
            .orderBy('vehicle.fechaVencimientoSeguro', 'ASC');
        const totalSeguros = await segurosQueryBuilder.getCount();
        const segurosProximosAVencer = await segurosQueryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        const vtvQueryBuilder = this.vehicleRepository
            .createQueryBuilder('vehicle')
            .where('vehicle.fechaVencimientoVTV IS NOT NULL')
            .andWhere('vehicle.fechaVencimientoVTV BETWEEN :today AND :futureDate', {
            today: today.toISOString().split('T')[0],
            futureDate: futureDate.toISOString().split('T')[0],
        })
            .orderBy('vehicle.fechaVencimientoVTV', 'ASC');
        const totalVtv = await vtvQueryBuilder.getCount();
        const vtvProximosAVencer = await vtvQueryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return {
            segurosProximosAVencer: {
                data: segurosProximosAVencer,
                totalItems: totalSeguros,
                currentPage: page,
                totalPages: Math.ceil(totalSeguros / limit),
            },
            vtvProximosAVencer: {
                data: vtvProximosAVencer,
                totalItems: totalVtv,
                currentPage: page,
                totalPages: Math.ceil(totalVtv / limit),
            },
        };
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = VehiclesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map