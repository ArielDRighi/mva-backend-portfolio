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
exports.ClientsPortalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const satisfactionSurvey_entity_1 = require("./entities/satisfactionSurvey.entity");
const typeorm_2 = require("typeorm");
const claim_entity_1 = require("./entities/claim.entity");
let ClientsPortalService = class ClientsPortalService {
    constructor(satisfactionSurveyRepository, claimRepository) {
        this.satisfactionSurveyRepository = satisfactionSurveyRepository;
        this.claimRepository = claimRepository;
    }
    async getSatisfactionSurveys() {
        const surveys = await this.satisfactionSurveyRepository.find();
        if (!surveys) {
            throw new common_1.BadRequestException('No se encontraron encuestas');
        }
        return surveys;
    }
    async getSatisfactionSurveyById(id) {
        const survey = await this.satisfactionSurveyRepository.findOne({
            where: { encuesta_id: id },
        });
        if (!survey) {
            throw new common_1.BadRequestException('Encuesta no encontrada');
        }
        return survey;
    }
    async getClaims() {
        const claims = await this.claimRepository.find();
        if (!claims) {
            throw new common_1.BadRequestException('No se encontraron reclamos');
        }
        return claims;
    }
    async getClaimById(id) {
        const claim = await this.claimRepository.findOne({
            where: { reclamo_id: id },
        });
        if (!claim) {
            throw new common_1.BadRequestException('Reclamo no encontrado');
        }
        return claim;
    }
    async createClaim(claimData) {
        const claim = this.claimRepository.create(claimData);
        try {
            await this.claimRepository.save(claim);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al crear reclamo: ${error}`);
        }
    }
    async createSatisfactionSurvey(surveyData) {
        const mappedData = {
            nombre_empresa: surveyData.cliente,
            lugar_proyecto: surveyData.asunto || '',
            contacto: surveyData.cliente,
            medio_contacto: 'Portal Web',
            tiempo_respuesta: 'Inmediato',
            calificacion_atencion: surveyData.calificacion,
            accesibilidad_comercial: 'Buena',
            relacion_precio_valor: 'Satisfactoria',
            recomendaria: surveyData.calificacion >= 4 ? 'Sí' : 'No',
            comentario_adicional: surveyData.comentario || null,
        };
        const survey = this.satisfactionSurveyRepository.create(mappedData);
        try {
            await this.satisfactionSurveyRepository.save(survey);
            return survey;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException(`Error al crear encuesta de satisfacción: ${errorMessage}`);
        }
    }
    async updateClaim(id, claimData) {
        const claim = await this.claimRepository.findOne({
            where: { reclamo_id: id },
        });
        if (!claim) {
            throw new common_1.BadRequestException('Reclamo no encontrado');
        }
        Object.assign(claim, claimData);
        try {
            await this.claimRepository.save(claim);
            return claim;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al actualizar reclamo: ${error}`);
        }
    }
    async updateSatisfactionSurvey(id, surveyData) {
        const survey = await this.satisfactionSurveyRepository.findOne({
            where: { encuesta_id: id },
        });
        if (!survey) {
            throw new common_1.BadRequestException('Encuesta no encontrada');
        }
        const mappedData = {};
        if (surveyData.cliente !== undefined) {
            mappedData.nombre_empresa = surveyData.cliente;
            mappedData.contacto = surveyData.cliente;
        }
        if (surveyData.asunto !== undefined) {
            mappedData.lugar_proyecto = surveyData.asunto;
        }
        if (surveyData.calificacion !== undefined) {
            mappedData.calificacion_atencion = surveyData.calificacion;
            mappedData.recomendaria = surveyData.calificacion >= 4 ? 'Sí' : 'No';
        }
        if (surveyData.comentario !== undefined) {
            mappedData.comentario_adicional = surveyData.comentario;
        }
        Object.assign(survey, mappedData);
        try {
            await this.satisfactionSurveyRepository.save(survey);
            return survey;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException(`Error al actualizar encuesta de satisfacción: ${errorMessage}`);
        }
    }
    askForService(formData) {
        return {
            message: 'Solicitud de servicio recibida exitosamente',
            data: formData,
        };
    }
    async getStats() {
        const totalSurveys = await this.satisfactionSurveyRepository.count();
        const totalClaims = await this.claimRepository.count();
        const surveys = await this.satisfactionSurveyRepository.find();
        const claims = await this.claimRepository.find();
        return {
            totalSurveys,
            totalClaims,
            surveys,
            claims,
        };
    }
};
exports.ClientsPortalService = ClientsPortalService;
exports.ClientsPortalService = ClientsPortalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(satisfactionSurvey_entity_1.SatisfactionSurvey)),
    __param(1, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClientsPortalService);
//# sourceMappingURL=clientsPortal.service.js.map