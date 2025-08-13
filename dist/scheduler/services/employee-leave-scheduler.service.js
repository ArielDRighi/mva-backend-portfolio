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
var EmployeeLeaveSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLeaveSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_leave_entity_1 = require("../../employee_leaves/entities/employee-leave.entity");
const employees_service_1 = require("../../employees/employees.service");
const date_fns_1 = require("date-fns");
let EmployeeLeaveSchedulerService = EmployeeLeaveSchedulerService_1 = class EmployeeLeaveSchedulerService {
    constructor(leaveRepository, employeesService) {
        this.leaveRepository = leaveRepository;
        this.employeesService = employeesService;
        this.logger = new common_1.Logger(EmployeeLeaveSchedulerService_1.name);
    }
    async handleScheduledLeaves() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.logger.log(`Ejecutando actualización de estados por licencias: ${(0, date_fns_1.format)(today, 'yyyy-MM-dd')}`);
        const startingLeaves = await this.leaveRepository.find({
            where: {
                fechaInicio: today,
                aprobado: true,
            },
            relations: ['employee'],
        });
        for (const leave of startingLeaves) {
            this.logger.log(`Empleado ${leave.employeeId} inicia periodo de licencia (${leave.tipoLicencia})`);
            await this.employeesService.changeStatus(leave.employeeId, 'NO_DISPONIBLE');
        }
        const endingLeaves = await this.leaveRepository.find({
            where: {
                fechaFin: today,
                aprobado: true,
            },
            relations: ['employee'],
        });
        for (const leave of endingLeaves) {
            const nextLeave = await this.leaveRepository.findOne({
                where: {
                    employeeId: leave.employeeId,
                    fechaInicio: today,
                    aprobado: true,
                },
            });
            if (!nextLeave) {
                this.logger.log(`Empleado ${leave.employeeId} finaliza periodo de licencia, vuelve a estar disponible`);
                await this.employeesService.changeStatus(leave.employeeId, 'DISPONIBLE');
            }
        }
    }
};
exports.EmployeeLeaveSchedulerService = EmployeeLeaveSchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeLeaveSchedulerService.prototype, "handleScheduledLeaves", null);
exports.EmployeeLeaveSchedulerService = EmployeeLeaveSchedulerService = EmployeeLeaveSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_leave_entity_1.EmployeeLeave)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        employees_service_1.EmployeesService])
], EmployeeLeaveSchedulerService);
//# sourceMappingURL=employee-leave-scheduler.service.js.map