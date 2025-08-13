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
exports.ClothingController = void 0;
const common_1 = require("@nestjs/common");
const clothing_service_1 = require("./clothing.service");
const roles_guard_1 = require("../roles/guards/roles.guard");
const role_enum_1 = require("../roles/enums/role.enum");
const CreateRopaTalles_dto_1 = require("./dto/CreateRopaTalles.dto");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const updateRopaTalles_dto_1 = require("./dto/updateRopaTalles.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ClothingController = class ClothingController {
    constructor(clothingService) {
        this.clothingService = clothingService;
    }
    async getAllClothingSpecs(page, limit, search) {
        return this.clothingService.getAllClothingSpecs(page, limit, search);
    }
    async exportExcel(res) {
        return this.clothingService.exportToExcel(res);
    }
    async getClothingSpecs(empleadoId) {
        try {
            return await this.clothingService.getClothingSpecs(empleadoId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'An error occurred');
        }
    }
    async create(talles, empleadoId) {
        return this.clothingService.createClothingSpecs(talles, empleadoId);
    }
    async update(talles, empleadoId) {
        return this.clothingService.updateClothingSpecs(talles, empleadoId);
    }
    async delete(empleadoId) {
        return this.clothingService.deleteClothingSpecs(empleadoId);
    }
};
exports.ClothingController = ClothingController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "getAllClothingSpecs", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "exportExcel", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':empleadoId'),
    __param(0, (0, common_1.Param)('empleadoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "getClothingSpecs", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('create/:empleadoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRopaTalles_dto_1.CreateRopaTallesDto, Number]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR, role_enum_1.Role.OPERARIO),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('modify/:empleadoId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateRopaTalles_dto_1.UpdateRopaTallesDto, Number]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)('delete/:empleadoId'),
    __param(0, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClothingController.prototype, "delete", null);
exports.ClothingController = ClothingController = __decorate([
    (0, common_1.Controller)('clothing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [clothing_service_1.ClothingService])
], ClothingController);
//# sourceMappingURL=clothing.controller.js.map