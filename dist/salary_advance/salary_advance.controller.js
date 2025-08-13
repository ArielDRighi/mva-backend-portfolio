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
exports.SalaryAdvanceController = void 0;
const common_1 = require("@nestjs/common");
const salary_advance_service_1 = require("./salary_advance.service");
const create_salary_advance_dto_1 = require("./dto/create-salary_advance.dto");
const passport_1 = require("@nestjs/passport");
const mailer_interceptor_1 = require("../mailer/interceptor/mailer.interceptor");
const approve_advance_dto_1 = require("./dto/approve-advance.dto");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
const roles_guard_1 = require("../roles/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SalaryAdvanceController = class SalaryAdvanceController {
    constructor(advanceService) {
        this.advanceService = advanceService;
    }
    create(dto, req) {
        return this.advanceService.createAdvance(dto, req?.user);
    }
    findAll(status, page = 1, limit = 10) {
        return this.advanceService.getAll(status, page, limit);
    }
    approveOrRejectAdvance(id, dto, req) {
        const adminId = req.user?.userId;
        if (!adminId) {
            throw new common_1.UnauthorizedException();
        }
        if (dto.status === 'approved') {
            console.log('Approving advance');
            return this.advanceService.approve(id, adminId);
        }
        else {
            console.log('Rejecting advance');
            return this.advanceService.reject(id);
        }
    }
    getEmployeeAdvances(req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException('Usuario no autenticado');
        }
        return this.advanceService.getEmployeeAdvances(req.user);
    }
};
exports.SalaryAdvanceController = SalaryAdvanceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_salary_advance_dto_1.CreateAdvanceDto, Object]),
    __metadata("design:returntype", void 0)
], SalaryAdvanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], SalaryAdvanceController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_advance_dto_1.ApproveAdvanceDto, Object]),
    __metadata("design:returntype", void 0)
], SalaryAdvanceController.prototype, "approveOrRejectAdvance", null);
__decorate([
    (0, common_1.Get)('employee'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalaryAdvanceController.prototype, "getEmployeeAdvances", null);
exports.SalaryAdvanceController = SalaryAdvanceController = __decorate([
    (0, common_1.UseInterceptors)(mailer_interceptor_1.MailerInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('salary-advances'),
    __metadata("design:paramtypes", [salary_advance_service_1.SalaryAdvanceService])
], SalaryAdvanceController);
//# sourceMappingURL=salary_advance.controller.js.map