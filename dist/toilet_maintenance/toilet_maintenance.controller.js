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
exports.ToiletMaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const toilet_maintenance_service_1 = require("./toilet_maintenance.service");
const create_toilet_maintenance_dto_1 = require("./dto/create_toilet_maintenance.dto");
const update_toilet_maintenance_dto_1 = require("./dto/update_toilet_maintenance.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ToiletMaintenanceController = class ToiletMaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async create(createMaintenanceDto) {
        return this.maintenanceService.create(createMaintenanceDto);
    }
    async findAll(paginationDto) {
        return this.maintenanceService.findAll(paginationDto);
    }
    async getMaintenanceStats(toiletId) {
        return this.maintenanceService.getMantenimientosStats(toiletId);
    }
    async getUpcomingMaintenances() {
        return this.maintenanceService.getUpcomingMaintenances();
    }
    async findById(maintenanceId) {
        return this.maintenanceService.findById(maintenanceId);
    }
    async update(maintenanceId, updateMaintenanceDto) {
        return this.maintenanceService.update(maintenanceId, updateMaintenanceDto);
    }
    async delete(maintenanceId) {
        return this.maintenanceService.delete(maintenanceId);
    }
    async completeMaintenace(maintenanceId) {
        return this.maintenanceService.completeMaintenace(maintenanceId);
    }
};
exports.ToiletMaintenanceController = ToiletMaintenanceController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_toilet_maintenance_dto_1.CreateToiletMaintenanceDto]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats/:toiletId'),
    __param(0, (0, common_1.Param)('toiletId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "getMaintenanceStats", null);
__decorate([
    (0, common_1.Get)('proximos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "getUpcomingMaintenances", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_toilet_maintenance_dto_1.UpdateToiletMaintenanceDto]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ToiletMaintenanceController.prototype, "completeMaintenace", null);
exports.ToiletMaintenanceController = ToiletMaintenanceController = __decorate([
    (0, common_1.Controller)('toilet_maintenance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [toilet_maintenance_service_1.ToiletMaintenanceService])
], ToiletMaintenanceController);
//# sourceMappingURL=toilet_maintenance.controller.js.map