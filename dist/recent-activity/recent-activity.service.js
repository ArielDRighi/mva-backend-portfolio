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
var RecentActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("../services/entities/service.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const toilet_maintenance_entity_1 = require("../toilet_maintenance/entities/toilet_maintenance.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
let RecentActivityService = RecentActivityService_1 = class RecentActivityService {
    constructor(servicesRepository, clientsRepository, toiletsRepository, maintenanceRepository, vehiclesRepository) {
        this.servicesRepository = servicesRepository;
        this.clientsRepository = clientsRepository;
        this.toiletsRepository = toiletsRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.vehiclesRepository = vehiclesRepository;
        this.logger = new common_1.Logger(RecentActivityService_1.name);
    }
    async getRecentActivity() {
        this.logger.log('Obteniendo actividad reciente');
        const [latestCompletedService, latestScheduledService, latestClient, latestToilet, latestMaintenance, latestVehicle,] = await Promise.all([
            this.getLatestCompletedService(),
            this.getLatestScheduledService(),
            this.getLatestClient(),
            this.getLatestToilet(),
            this.getLatestMaintenance(),
            this.getLatestVehicle(),
        ]);
        return {
            latestCompletedService,
            latestScheduledService,
            latestClient,
            latestToilet,
            latestMaintenance,
            latestVehicle,
            timestamp: new Date(),
        };
    }
    async getLatestCompletedService() {
        return this.servicesRepository.findOne({
            where: { estado: resource_states_enum_1.ServiceState.COMPLETADO },
            relations: ['cliente'],
            order: { fechaFin: 'DESC' },
        });
    }
    async getLatestScheduledService() {
        return this.servicesRepository.findOne({
            where: { estado: resource_states_enum_1.ServiceState.PROGRAMADO },
            relations: ['cliente'],
            order: { fechaProgramada: 'ASC' },
        });
    }
    async getLatestClient() {
        return this.clientsRepository
            .createQueryBuilder('cliente')
            .orderBy('cliente.clienteId', 'DESC')
            .getOne();
    }
    async getLatestToilet() {
        return this.toiletsRepository
            .createQueryBuilder('bano')
            .orderBy('bano.baño_id', 'DESC')
            .getOne();
    }
    async getLatestMaintenance() {
        return this.maintenanceRepository
            .createQueryBuilder('mantenimiento')
            .leftJoinAndSelect('mantenimiento.toilet', 'toilet')
            .orderBy('mantenimiento.createdAt', 'DESC')
            .getOne();
    }
    async getLatestVehicle() {
        return this.vehiclesRepository
            .createQueryBuilder('vehiculo')
            .orderBy('vehiculo.vehiculo_id', 'DESC')
            .getOne();
    }
};
exports.RecentActivityService = RecentActivityService;
exports.RecentActivityService = RecentActivityService = RecentActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __param(2, (0, typeorm_1.InjectRepository)(chemical_toilet_entity_1.ChemicalToilet)),
    __param(3, (0, typeorm_1.InjectRepository)(toilet_maintenance_entity_1.ToiletMaintenance)),
    __param(4, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RecentActivityService);
//# sourceMappingURL=recent-activity.service.js.map