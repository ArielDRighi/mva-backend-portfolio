"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLeavesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_leave_entity_1 = require("./entities/employee-leave.entity");
const employee_leaves_service_1 = require("./employee-leaves.service");
const employee_leaves_controller_1 = require("./employee-leaves.controller");
const employees_module_1 = require("../employees/employees.module");
let EmployeeLeavesModule = class EmployeeLeavesModule {
};
exports.EmployeeLeavesModule = EmployeeLeavesModule;
exports.EmployeeLeavesModule = EmployeeLeavesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_leave_entity_1.EmployeeLeave]),
            employees_module_1.EmployeesModule,
        ],
        controllers: [employee_leaves_controller_1.EmployeeLeavesController],
        providers: [employee_leaves_service_1.EmployeeLeavesService],
        exports: [employee_leaves_service_1.EmployeeLeavesService],
    })
], EmployeeLeavesModule);
//# sourceMappingURL=employee-leaves.module.js.map