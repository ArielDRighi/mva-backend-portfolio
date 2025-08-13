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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../roles/enums/role.enum");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create_employee.dto");
const update_employee_dto_1 = require("./dto/update_employee.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const create_license_dto_1 = require("./dto/create_license.dto");
const create_contact_emergency_dto_1 = require("./dto/create_contact_emergency.dto");
const update_contact_emergency_dto_1 = require("./dto/update_contact_emergency.dto");
const update_license_dto_1 = require("./dto/update_license.dto");
const create_examen_dto_1 = require("./dto/create_examen.dto");
const modify_examen_dto_1 = require("./dto/modify_examen.dto");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async updateExamenPreocupacional(updateExamenPreocupacionalDto, examenId) {
        return await this.employeesService.updateExamenPreocupacional(examenId, updateExamenPreocupacionalDto);
    }
    async removeExamenPreocupacional(examenId) {
        return await this.employeesService.removeExamenPreocupacional(examenId);
    }
    async createExamenPreocupacional(createExamenPreocupacionalDto) {
        return await this.employeesService.createExamenPreocupacional(createExamenPreocupacionalDto);
    }
    async findExamenesByEmpleadoId(empleadoId) {
        return await this.employeesService.findExamenesByEmpleadoId(empleadoId);
    }
    async createEmergencyContact(createEmergencyContactDto, empleadoId) {
        return await this.employeesService.createEmergencyContact(createEmergencyContactDto, empleadoId);
    }
    async removeEmergencyContact(contactoId) {
        return await this.employeesService.removeEmergencyContact(contactoId);
    }
    async updateEmergencyContact(updateEmergencyContactDto, contactoId) {
        return await this.employeesService.updateEmergencyContact(contactoId, updateEmergencyContactDto);
    }
    async findEmergencyContactsByEmpleadoId(empleadoId) {
        try {
            return await this.employeesService.findEmergencyContactsByEmpleadoId(empleadoId);
        }
        catch (error) {
            console.error('Error finding emergency contacts:', error);
        }
    }
    async findLicensesToExpire(dias, page, limit) {
        return await this.employeesService.findLicensesToExpire(dias, page, limit);
    }
    async updateLicencia(updateLicenseDto, empleadoId) {
        return await this.employeesService.updateLicencia(empleadoId, updateLicenseDto);
    }
    async removeLicencia(licenciaId) {
        return await this.employeesService.removeLicencia(licenciaId);
    }
    async createLicencia(createEmployeeDto, empleadoId) {
        console.log('Empleado ID:', empleadoId);
        console.log('Create License DTO:', createEmployeeDto);
        return await this.employeesService.createLicencia(createEmployeeDto, empleadoId);
    }
    async findLicenciasByEmpleadoId(empleadoId) {
        return await this.employeesService.findLicenciasByEmpleadoId(empleadoId);
    }
    async obtenerProximosServicios(id) {
        return await this.employeesService.findProximosServiciosPorEmpleadoId(id);
    }
    async findLicencias(dias, page, limit, search) {
        return await this.employeesService.findLicencias(dias, page, limit, search);
    }
    async create(createEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    }
    async findAll(paginationDto) {
        return this.employeesService.findAll(paginationDto);
    }
    async getTotalEmployees() {
        return this.employeesService.getTotalEmployees();
    }
    findOne(id) {
        return this.employeesService.findOne(id);
    }
    findByDocumento(documento) {
        return this.employeesService.findByDocumento(documento);
    }
    update(id, updateEmployeeDto) {
        return this.employeesService.update(id, updateEmployeeDto);
    }
    remove(id) {
        return this.employeesService.remove(id);
    }
    changeStatus(id, estado) {
        return this.employeesService.changeStatus(id, estado);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Put)('examen/modify/:examenId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('examenId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modify_examen_dto_1.UpdateExamenPreocupacionalDto, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateExamenPreocupacional", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)('examen/delete/:examenId'),
    __param(0, (0, common_1.Param)('examenId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "removeExamenPreocupacional", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Post)('examen/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_examen_dto_1.CreateExamenPreocupacionalDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createExamenPreocupacional", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('examen/:empleadoId'),
    __param(0, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findExamenesByEmpleadoId", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Post)('emergency/:empleadoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_emergency_dto_1.CreateContactEmergencyDto, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createEmergencyContact", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Delete)('emergency/delete/:contactoId'),
    __param(0, (0, common_1.Param)('contactoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "removeEmergencyContact", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Put)('emergency/modify/:contactoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('contactoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contact_emergency_dto_1.UpdateContactEmergencyDto, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateEmergencyContact", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Get)('emergency/:empleadoId'),
    __param(0, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findEmergencyContactsByEmpleadoId", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('licencias/por-vencer'),
    __param(0, (0, common_1.Query)('dias', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findLicensesToExpire", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Put)('licencia/update/:empleadoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_license_dto_1.UpdateLicenseDto, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateLicencia", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Delete)('licencia/delete/:licenciaId'),
    __param(0, (0, common_1.Param)('licenciaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "removeLicencia", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Post)('licencia/:empleadoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_license_dto_1.CreateLicenseDto, Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createLicencia", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Get)('licencia/:empleadoId'),
    __param(0, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findLicenciasByEmpleadoId", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)(':id/proximos-servicios'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "obtenerProximosServicios", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.Get)('licencias'),
    __param(0, (0, common_1.Query)('dias', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findLicencias", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateFullEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('total_employees'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getTotalEmployees", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('documento/:documento'),
    __param(0, (0, common_1.Param)('documento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findByDocumento", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "changeStatus", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, common_1.Controller)('employees'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map