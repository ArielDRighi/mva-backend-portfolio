"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("../services/entities/service.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const contract_expiration_service_1 = require("./services/contract-expiration.service");
const employee_leave_scheduler_service_1 = require("./services/employee-leave-scheduler.service");
const employee_leave_entity_1 = require("../employee_leaves/entities/employee-leave.entity");
const employees_module_1 = require("../employees/employees.module");
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([service_entity_1.Service, chemical_toilet_entity_1.ChemicalToilet, employee_leave_entity_1.EmployeeLeave]),
            employees_module_1.EmployeesModule,
        ],
        providers: [contract_expiration_service_1.ContractExpirationService, employee_leave_scheduler_service_1.EmployeeLeaveSchedulerService],
        exports: [contract_expiration_service_1.ContractExpirationService, employee_leave_scheduler_service_1.EmployeeLeaveSchedulerService],
    })
], SchedulerModule);
//# sourceMappingURL=scheduler.module.js.map