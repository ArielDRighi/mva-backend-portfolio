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
exports.ChemicalToiletsController = void 0;
const common_1 = require("@nestjs/common");
const chemical_toilets_service_1 = require("./chemical_toilets.service");
const create_chemical_toilet_dto_1 = require("./dto/create_chemical_toilet.dto");
const update_chemical_toilet_dto_1 = require("./dto/update_chemical.toilet.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
let ChemicalToiletsController = class ChemicalToiletsController {
    constructor(chemicalToiletsService) {
        this.chemicalToiletsService = chemicalToiletsService;
    }
    async findServicesByToilet(id) {
        return this.chemicalToiletsService.findServicesByToiletId(id);
    }
    async getTotalChemicalToilets() {
        return this.chemicalToiletsService.getTotalChemicalToilets();
    }
    async create(createChemicalToiletDto) {
        return this.chemicalToiletsService.create(createChemicalToiletDto);
    }
    async findAll(page = '1', limit = '10', search) {
        const paginationDto = {
            page: Number(page),
            limit: Number(limit),
        };
        return this.chemicalToiletsService.findAll(paginationDto, search);
    }
    async findById(id) {
        return this.chemicalToiletsService.findById(id);
    }
    async update(id, updateChemicalToiletDto) {
        return this.chemicalToiletsService.update(id, updateChemicalToiletDto);
    }
    async remove(id) {
        return this.chemicalToiletsService.remove(id);
    }
    async getStats(id) {
        return this.chemicalToiletsService.getMaintenanceStats(id);
    }
    async findToiletsByClient(clientId) {
        return this.chemicalToiletsService.findByClientId(clientId);
    }
};
exports.ChemicalToiletsController = ChemicalToiletsController;
__decorate([
    (0, common_1.Get)(':id/services'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "findServicesByToilet", null);
__decorate([
    (0, common_1.Get)('total_chemical_toilets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "getTotalChemicalToilets", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chemical_toilet_dto_1.CreateChemicalToiletDto]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chemical_toilet_dto_1.UpdateChemicalToiletDto]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Get)('stats/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/by-client/:clientId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChemicalToiletsController.prototype, "findToiletsByClient", null);
exports.ChemicalToiletsController = ChemicalToiletsController = __decorate([
    (0, common_1.Controller)('chemical_toilets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chemical_toilets_service_1.ChemicalToiletsService])
], ChemicalToiletsController);
//# sourceMappingURL=chemical_toilets.controller.js.map