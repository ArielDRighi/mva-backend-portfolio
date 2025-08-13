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
exports.EmployeeLeavesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
const employee_leaves_service_1 = require("./employee-leaves.service");
const create_employee_leave_dto_1 = require("./dto/create-employee-leave.dto");
const update_employee_leave_dto_1 = require("./dto/update-employee-leave.dto");
const employee_leave_entity_1 = require("./entities/employee-leave.entity");
let EmployeeLeavesController = class EmployeeLeavesController {
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    create(createLeaveDto) {
        return this.leavesService.create(createLeaveDto);
    }
    findAll(page, limit, search, tipoLicencia) {
        return this.leavesService.findAll(page, limit, search, tipoLicencia);
    }
    findOne(id) {
        return this.leavesService.findOne(+id);
    }
    findByEmployee(id) {
        return this.leavesService.findByEmployee(+id);
    }
    update(id, updateLeaveDto) {
        return this.leavesService.update(+id, updateLeaveDto);
    }
    approve(id) {
        return this.leavesService.approve(id);
    }
    async rejectLeave(id, comentario) {
        return this.leavesService.reject(id, comentario);
    }
    reject(id) {
        return this.leavesService.reject(id);
    }
    remove(id) {
        return this.leavesService.remove(+id);
    }
};
exports.EmployeeLeavesController = EmployeeLeavesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_leave_dto_1.CreateEmployeeLeaveDto]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('tipoLicencia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('employee/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_leave_dto_1.UpdateEmployeeLeaveDto]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('comentario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], EmployeeLeavesController.prototype, "rejectLeave", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeLeavesController.prototype, "remove", null);
exports.EmployeeLeavesController = EmployeeLeavesController = __decorate([
    (0, common_1.Controller)('employee-leaves'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [employee_leaves_service_1.EmployeeLeavesService])
], EmployeeLeavesController);
//# sourceMappingURL=employee-leaves.controller.js.map