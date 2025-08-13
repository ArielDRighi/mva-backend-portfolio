"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryAdvanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const salary_advance_controller_1 = require("./salary_advance.controller");
const salary_advance_service_1 = require("./salary_advance.service");
const employee_entity_1 = require("../employees/entities/employee.entity");
const salary_advance_entity_1 = require("./entities/salary_advance.entity");
const mailer_module_1 = require("../mailer/mailer.module");
let SalaryAdvanceModule = class SalaryAdvanceModule {
};
exports.SalaryAdvanceModule = SalaryAdvanceModule;
exports.SalaryAdvanceModule = SalaryAdvanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([salary_advance_entity_1.SalaryAdvance, employee_entity_1.Empleado]), mailer_module_1.MailerModule],
        controllers: [salary_advance_controller_1.SalaryAdvanceController],
        providers: [salary_advance_service_1.SalaryAdvanceService],
    })
], SalaryAdvanceModule);
//# sourceMappingURL=salary_advance.module.js.map