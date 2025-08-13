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
var ContractExpirationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpirationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const service_entity_1 = require("../../services/entities/service.entity");
const chemical_toilet_entity_1 = require("../../chemical_toilets/entities/chemical_toilet.entity");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
const resource_states_enum_2 = require("../../common/enums/resource-states.enum");
let ContractExpirationService = ContractExpirationService_1 = class ContractExpirationService {
    constructor(serviceRepository, toiletsRepository) {
        this.serviceRepository = serviceRepository;
        this.toiletsRepository = toiletsRepository;
        this.logger = new common_1.Logger(ContractExpirationService_1.name);
    }
    async checkExpiredContracts() {
        this.logger.log('Ejecutando verificación de contratos expirados');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        try {
            const expiredAssignments = await this.serviceRepository.find({
                where: {
                    fechaFinAsignacion: (0, typeorm_2.LessThan)(today),
                    tipoServicio: resource_states_enum_2.ServiceType.INSTALACION,
                },
                relations: ['asignaciones', 'asignaciones.bano'],
            });
            this.logger.log(`Encontrados ${expiredAssignments.length} servicios con contratos expirados`);
            for (const service of expiredAssignments) {
                if (service.asignaciones && service.asignaciones.length > 0) {
                    for (const asignacion of service.asignaciones) {
                        if (asignacion.bano) {
                            this.logger.log(`Liberando baño ${asignacion.bano.baño_id} por fin de contrato`);
                            await this.toiletsRepository.update(asignacion.bano.baño_id, {
                                estado: resource_states_enum_1.ResourceState.DISPONIBLE,
                            });
                        }
                    }
                }
                await this.serviceRepository.update(service.id, {
                    fechaFinAsignacion: undefined,
                });
                this.logger.log(`Servicio ${service.id} procesado exitosamente`);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            const errorStack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Error al verificar contratos expirados: ${errorMessage}`, errorStack);
        }
    }
};
exports.ContractExpirationService = ContractExpirationService;
__decorate([
    (0, schedule_1.Cron)('1 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractExpirationService.prototype, "checkExpiredContracts", null);
exports.ContractExpirationService = ContractExpirationService = ContractExpirationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(chemical_toilet_entity_1.ChemicalToilet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ContractExpirationService);
//# sourceMappingURL=contract-expiration.service.js.map