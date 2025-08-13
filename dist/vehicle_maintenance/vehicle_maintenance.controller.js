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
exports.VehicleMaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_maintenance_service_1 = require("./vehicle_maintenance.service");
const create_maintenance_dto_1 = require("./dto/create_maintenance.dto");
const update_maintenance_dto_1 = require("./dto/update_maintenance.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
let VehicleMaintenanceController = class VehicleMaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    create(createMaintenanceDto) {
        return this.maintenanceService.create(createMaintenanceDto);
    }
    async findAll(page = '1', limit = '10', search) {
        const paginationDto = {
            page: Number(page),
            limit: Number(limit),
        };
        return this.maintenanceService.findAll(paginationDto, search);
    }
    findUpcoming() {
        return this.maintenanceService.findUpcomingMaintenances();
    }
    findOne(id) {
        return this.maintenanceService.findOne(id);
    }
    findByVehicle(vehiculoId) {
        return this.maintenanceService.findByVehicle(vehiculoId);
    }
    update(id, updateMaintenanceDto) {
        return this.maintenanceService.update(id, updateMaintenanceDto);
    }
    remove(id) {
        return this.maintenanceService.remove(id);
    }
    completeMaintenace(id) {
        return this.maintenanceService.completeMaintenace(id);
    }
};
exports.VehicleMaintenanceController = VehicleMaintenanceController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_maintenance_dto_1.CreateMaintenanceDto]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "findUpcoming", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('vehiculo/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "findByVehicle", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_maintenance_dto_1.UpdateMaintenanceDto]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VehicleMaintenanceController.prototype, "completeMaintenace", null);
exports.VehicleMaintenanceController = VehicleMaintenanceController = __decorate([
    (0, common_1.Controller)('vehicle_maintenance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [vehicle_maintenance_service_1.VehicleMaintenanceService])
], VehicleMaintenanceController);
//# sourceMappingURL=vehicle_maintenance.controller.js.map