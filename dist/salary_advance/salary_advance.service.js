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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryAdvanceService = void 0;
const employee_entity_1 = require("../employees/entities/employee.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const salary_advance_entity_1 = require("./entities/salary_advance.entity");
let SalaryAdvanceService = class SalaryAdvanceService {
    constructor() {
        this.advanceRequests = [];
    }
    async createAdvance(dto, user) {
        const employee = await this.employeeRepository.findOne({
            where: { id: user.empleadoId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Empleado no encontrado');
        }
        const pendingAdvance = await this.salaryAdvanceRepository.findOne({
            where: {
                employee: { id: employee.id },
                status: 'pending',
            },
        });
        if (pendingAdvance) {
            throw new common_1.BadRequestException('Ya tienes una solicitud de adelanto pendiente. No puedes crear otra hasta que se resuelva la actual.');
        }
        const newAdvance = this.salaryAdvanceRepository.create({
            employee,
            amount: dto.amount,
            reason: dto.reason,
            status: 'pending',
        });
        return await this.salaryAdvanceRepository.save(newAdvance);
    }
    async getAll(status = undefined, page = 1, limit = 10) {
        const advances = await this.salaryAdvanceRepository.find({
            where: status ? { status } : {},
            relations: ['employee'],
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            advances,
            total: await this.salaryAdvanceRepository.count({
                where: status ? { status } : {},
            }),
            page,
            limit,
        };
    }
    async approve(id, adminId) {
        const request = await this.salaryAdvanceRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['employee'],
        });
        if (!request || request.status !== 'pending') {
            return null;
        }
        request.status = 'approved';
        request.approvedBy = adminId;
        request.approvedAt = new Date();
        request.updatedAt = new Date();
        return await this.salaryAdvanceRepository.save(request);
    }
    async reject(id) {
        const request = await this.salaryAdvanceRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: ['employee'],
        });
        if (!request || request.status !== 'pending') {
            return null;
        }
        request.status = 'rejected';
        request.updatedAt = new Date();
        return await this.salaryAdvanceRepository.save(request);
    }
    async getEmployeeAdvances(user) {
        if (!user || !user.empleadoId) {
            throw new common_1.BadRequestException('Usuario no autenticado');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: user.empleadoId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Empleado no encontrado');
        }
        return await this.salaryAdvanceRepository.find({
            where: { employee: { id: employee.id } },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.SalaryAdvanceService = SalaryAdvanceService;
__decorate([
    (0, typeorm_1.InjectRepository)(employee_entity_1.Empleado),
    __metadata("design:type", typeorm_2.Repository)
], SalaryAdvanceService.prototype, "employeeRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(salary_advance_entity_1.SalaryAdvance),
    __metadata("design:type", typeorm_2.Repository)
], SalaryAdvanceService.prototype, "salaryAdvanceRepository", void 0);
exports.SalaryAdvanceService = SalaryAdvanceService = __decorate([
    (0, common_1.Injectable)()
], SalaryAdvanceService);
//# sourceMappingURL=salary_advance.service.js.map