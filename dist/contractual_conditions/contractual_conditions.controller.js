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
exports.ContractualConditionsController = void 0;
const modify_contractual_conditions_dto_1 = require("./dto/modify_contractual_conditions.dto");
const create_contractual_conditions_dto_1 = require("./dto/create_contractual_conditions.dto");
const contractual_conditions_service_1 = require("./contractual_conditions.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
let ContractualConditionsController = class ContractualConditionsController {
    constructor(contractualConditionsService) {
        this.contractualConditionsService = contractualConditionsService;
    }
    async getAllContractualConditions(page = 1, limit = 10, search) {
        try {
            return await this.contractualConditionsService.getAllContractualConditions(page, limit, search);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getContractualConditionById(contractualConditionId) {
        try {
            return await this.contractualConditionsService.getContractualConditionById(contractualConditionId);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getContractualConditionsByClient(clientId, page = 1, limit = 10, search) {
        try {
            return await this.contractualConditionsService.getContractualConditionsByClient(clientId, page, limit, search);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createContractualCondition(createContractualConditionDto) {
        try {
            return await this.contractualConditionsService.createContractualCondition(createContractualConditionDto);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async modifyContractualCondition(modifyContractualConditionDto, id) {
        try {
            return await this.contractualConditionsService.modifyContractualCondition(modifyContractualConditionDto, id);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteContractualCondition(id) {
        try {
            return await this.contractualConditionsService.deleteContractualCondition(id);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido ocurrido';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ContractualConditionsController = ContractualConditionsController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "getAllContractualConditions", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "getContractualConditionById", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('client-id/:clientId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "getContractualConditionsByClient", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contractual_conditions_dto_1.CreateContractualConditionDto]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "createContractualCondition", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Put)('modify/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modify_contractual_conditions_dto_1.ModifyCondicionContractualDto, Number]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "modifyContractualCondition", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContractualConditionsController.prototype, "deleteContractualCondition", null);
exports.ContractualConditionsController = ContractualConditionsController = __decorate([
    (0, common_1.Controller)('contractual_conditions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contractual_conditions_service_1.ContractualConditionsService])
], ContractualConditionsController);
//# sourceMappingURL=contractual_conditions.controller.js.map