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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const change_service_status_dto_1 = require("./dto/change-service-status.dto");
const mailer_interceptor_1 = require("../mailer/interceptor/mailer.interceptor");
const filter_service_dto_1 = require("./dto/filter-service.dto");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async getCapacitacionServices(page = 1, limit = 10, search) {
        return this.servicesService.getCapacitacionServices(page, limit, search);
    }
    async getInstalacionServices(page = 1, limit = 10) {
        const ret = this.servicesService.getInstalacionServices(page, limit);
        console.log('ret', ret);
        return ret;
    }
    async getLimpiezaServices(page = 1, limit = 10) {
        return this.servicesService.getLimpiezaServices(page, limit);
    }
    async getLastServicesByEmployee(employeeId) {
        return this.servicesService.getLastServices(employeeId);
    }
    async getCompletedServicesByEmployee(employeeId, page = 1, limit = 10, search) {
        try {
            const paginationDto = { page, limit, search };
            return this.servicesService.getCompletedServices(employeeId, paginationDto);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            throw new common_1.HttpException(`Error al obtener los servicios completados: ${errorMessage}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProximosServicios() {
        return this.servicesService.getProximosServicios();
    }
    createInstalacion(dto) {
        dto.tipoServicio = resource_states_enum_1.ServiceType.INSTALACION;
        return this.servicesService.create(dto);
    }
    createCapacitacion(dto) {
        dto.tipoServicio = resource_states_enum_1.ServiceType.CAPACITACION;
        return this.servicesService.create(dto);
    }
    createLimpieza(dto) {
        dto.tipoServicio = resource_states_enum_1.ServiceType.LIMPIEZA;
        return this.servicesService.create(dto);
    }
    create(createServiceDto) {
        return this.servicesService.create(createServiceDto);
    }
    async getAssignedPendings(employeeId) {
        console.log('employeeId', employeeId);
        return this.servicesService.getAssignedPendings(employeeId);
    }
    async getAssignedInProgress(employeeId) {
        console.log('employeeId', employeeId);
        return this.servicesService.getAssignedInProgress(employeeId);
    }
    async findAll(filterDto, page = 1, limit = 10) {
        try {
            return await this.servicesService.findAll(filterDto, page, limit);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            throw new common_1.HttpException(`Error al obtener los servicios: ${errorMessage}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getServicesStats() {
        return this.servicesService.getStats();
    }
    async getResumenServicios() {
        return this.servicesService.getResumenServicios();
    }
    findByDateRange(startDate, endDate) {
        return this.servicesService.findByDateRange(startDate, endDate);
    }
    async getRemainingWeekServices() {
        return this.servicesService.getRemainingWeekServices();
    }
    findToday() {
        return this.servicesService.findToday();
    }
    findPending() {
        return this.servicesService.findByStatus(resource_states_enum_1.ServiceState.SUSPENDIDO);
    }
    findInProgress() {
        return this.servicesService.findByStatus(resource_states_enum_1.ServiceState.EN_PROGRESO);
    }
    findOne(id) {
        return this.servicesService.findOne(id);
    }
    update(id, updateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }
    remove(id) {
        return this.servicesService.remove(id);
    }
    async changeStatus(id, statusDto) {
        if (!Object.values(resource_states_enum_1.ServiceState).includes(statusDto.estado)) {
            throw new common_1.BadRequestException(`Estado inválido: ${statusDto.estado}`);
        }
        if (statusDto.estado === resource_states_enum_1.ServiceState.INCOMPLETO &&
            !statusDto.comentarioIncompleto) {
            throw new common_1.BadRequestException('Para cambiar un servicio a estado INCOMPLETO, debe proporcionar un comentario explicando el motivo');
        }
        return this.servicesService.changeStatus(id, statusDto.estado, statusDto.comentarioIncompleto);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Get)('capacitacion'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getCapacitacionServices", null);
__decorate([
    (0, common_1.Get)('instalacion'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getInstalacionServices", null);
__decorate([
    (0, common_1.Get)('generico'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getLimpiezaServices", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId/last'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getLastServicesByEmployee", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId/completed'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getCompletedServicesByEmployee", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('proximos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getProximosServicios", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)('instalacion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createInstalacion", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)('capacitacion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createCapacitacion", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)('limpieza'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createLimpieza", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)('generico'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.OPERARIO, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('/assigned/pendings/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAssignedPendings", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.OPERARIO, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('/assigned/inProgress/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAssignedInProgress", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_service_dto_1.FilterServicesDto, Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServicesStats", null);
__decorate([
    (0, common_1.Get)('resumen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getResumenServicios", null);
__decorate([
    (0, common_1.Get)('date-range'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)('semana-restante'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getRemainingWeekServices", null);
__decorate([
    (0, common_1.Get)('today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findToday", null);
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)('in-progress'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findInProgress", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, change_service_status_dto_1.ChangeServiceStatusDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "changeStatus", null);
exports.ServicesController = ServicesController = __decorate([
    (0, common_1.UseInterceptors)(mailer_interceptor_1.MailerInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('services'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map