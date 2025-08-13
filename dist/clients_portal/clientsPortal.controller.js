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
exports.ClientsPortalController = void 0;
const common_1 = require("@nestjs/common");
const clientsPortal_service_1 = require("./clientsPortal.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const roles_guard_1 = require("../roles/guards/roles.guard");
const role_enum_1 = require("../roles/enums/role.enum");
const createClaim_dto_1 = require("./dto/createClaim.dto");
const createSatisfactionSurvey_dto_1 = require("./dto/createSatisfactionSurvey.dto");
const askForService_dto_1 = require("./dto/askForService.dto");
const mailer_interceptor_1 = require("../mailer/interceptor/mailer.interceptor");
let ClientsPortalController = class ClientsPortalController {
    constructor(clientsPortalService) {
        this.clientsPortalService = clientsPortalService;
    }
    getSatisfactionSurveys() {
        try {
            return this.clientsPortalService.getSatisfactionSurveys();
        }
        catch (error) {
            console.error('Error al obtener encuestas de satisfacción:', error);
            throw new common_1.HttpException('Error al obtener encuestas de satisfacción', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getSatisfactionSurveyById(id) {
        try {
            return this.clientsPortalService.getSatisfactionSurveyById(id);
        }
        catch (error) {
            console.error('Error al obtener encuesta de satisfacción:', error);
            throw new common_1.HttpException('Error al obtener encuesta de satisfacción', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getClaims() {
        try {
            return this.clientsPortalService.getClaims();
        }
        catch (error) {
            console.error('Error al obtener reclamos:', error);
            throw new common_1.HttpException('Error al obtener reclamos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getClaimById(id) {
        try {
            return this.clientsPortalService.getClaimById(id);
        }
        catch (error) {
            console.error('Error al obtener reclamo:', error);
            throw new common_1.HttpException('Error al obtener reclamo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createClaim(claimData) {
        try {
            return await this.clientsPortalService.createClaim(claimData);
        }
        catch (error) {
            console.error('Error al crear reclamo:', error);
            throw new common_1.HttpException('Error al crear reclamo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createSatisfactionSurvey(surveyData) {
        try {
            console.log('Creando encuesta de satisfacción:', surveyData);
            return await this.clientsPortalService.createSatisfactionSurvey(surveyData);
        }
        catch (error) {
            console.error('Error al crear encuesta de satisfacción:', error);
            throw new common_1.HttpException('Error al crear encuesta de satisfacción', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateClaim(id, claimData) {
        try {
            return await this.clientsPortalService.updateClaim(id, claimData);
        }
        catch (error) {
            console.error('Error al actualizar reclamo:', error);
            throw new common_1.HttpException('Error al actualizar reclamo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateSatisfactionSurvey(id, surveyData) {
        try {
            return await this.clientsPortalService.updateSatisfactionSurvey(id, surveyData);
        }
        catch (error) {
            console.error('Error al actualizar encuesta de satisfacción:', error);
            throw new common_1.HttpException('Error al actualizar encuesta de satisfacción', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async askForServiceForm(formData) {
        try {
            return await this.clientsPortalService.askForService(formData);
        }
        catch (error) {
            console.error('Error al crear formulario de solicitud de servicio:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new common_1.HttpException(`Error al crear formulario de solicitud de servicio: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStats() {
        try {
            return await this.clientsPortalService.getStats();
        }
        catch (error) {
            console.error('Error al obtener estadísticas:', error);
            throw new common_1.HttpException('Error al obtener estadísticas', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ClientsPortalController = ClientsPortalController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('satisfaction_surveys'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientsPortalController.prototype, "getSatisfactionSurveys", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('satisfaction_surveys/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsPortalController.prototype, "getSatisfactionSurveyById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('claims'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientsPortalController.prototype, "getClaims", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('claims/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientsPortalController.prototype, "getClaimById", null);
__decorate([
    (0, common_1.Post)('claims'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClaim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Post)('satisfaction_surveys'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSatisfactionSurvey_dto_1.CreateSatisfactionSurveyDto]),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "createSatisfactionSurvey", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)('claims/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "updateClaim", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)('satisfaction_surveys/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "updateSatisfactionSurvey", null);
__decorate([
    (0, common_1.Post)('ask_for_service'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [askForService_dto_1.AskForServiceDto]),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "askForServiceForm", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsPortalController.prototype, "getStats", null);
exports.ClientsPortalController = ClientsPortalController = __decorate([
    (0, common_1.UseInterceptors)(mailer_interceptor_1.MailerInterceptor),
    (0, common_1.Controller)('clients_portal'),
    __metadata("design:paramtypes", [clientsPortal_service_1.ClientsPortalService])
], ClientsPortalController);
//# sourceMappingURL=clientsPortal.controller.js.map