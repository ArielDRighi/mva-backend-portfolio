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
exports.FutureCleaningsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const futureCleanings_service_1 = require("./futureCleanings.service");
const modifyFutureCleanings_dto_1 = require("./dto/modifyFutureCleanings.dto");
const createFutureCleanings_dto_1 = require("./dto/createFutureCleanings.dto");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
let FutureCleaningsController = class FutureCleaningsController {
    constructor(futureCleaningsService) {
        this.futureCleaningsService = futureCleaningsService;
    }
    async getAllFutureCleanings(page = '1', limit = '5') {
        try {
            const paginationDto = {
                page: Number(page),
                limit: Number(limit),
            };
            return await this.futureCleaningsService.getAll(paginationDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async deleteFutureCleaning(id) {
        try {
            return await this.futureCleaningsService.deleteFutureCleaning(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async getFutureCleaningsByDateRange(startDate, endDate, page = '1', limit = '10') {
        try {
            const paginationDto = {
                page: Number(page),
                limit: Number(limit),
            };
            return await this.futureCleaningsService.getByDateRange(new Date(startDate), new Date(endDate), paginationDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async getUpcomingCleanings(days = '7', page = '1', limit = '10') {
        try {
            const paginationDto = {
                page: Number(page),
                limit: Number(limit),
            };
            return await this.futureCleaningsService.getUpcomingCleanings(Number(days), paginationDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async getFutureCleaningById(id) {
        try {
            return await this.futureCleaningsService.getById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async createFutureCleaning(data) {
        try {
            return await this.futureCleaningsService.createFutureCleaning(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async updateFutureCleaning(id, data) {
        try {
            return await this.futureCleaningsService.updateFutureCleaning(id, data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
};
exports.FutureCleaningsController = FutureCleaningsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "getAllFutureCleanings", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "deleteFutureCleaning", null);
__decorate([
    (0, common_1.Get)('/by-date-range'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "getFutureCleaningsByDateRange", null);
__decorate([
    (0, common_1.Get)('/upcoming'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('days')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "getUpcomingCleanings", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "getFutureCleaningById", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFutureCleanings_dto_1.CreateFutureCleaningDto]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "createFutureCleaning", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    (0, common_1.Put)('modify/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, modifyFutureCleanings_dto_1.ModifyFutureCleaningDto]),
    __metadata("design:returntype", Promise)
], FutureCleaningsController.prototype, "updateFutureCleaning", null);
exports.FutureCleaningsController = FutureCleaningsController = __decorate([
    (0, common_1.Controller)('future_cleanings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [futureCleanings_service_1.FutureCleaningsService])
], FutureCleaningsController);
//# sourceMappingURL=futureCleanings.controller.js.map