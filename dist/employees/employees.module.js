"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const roles_module_1 = require("../roles/roles.module");
const license_entity_1 = require("./entities/license.entity");
const emergencyContacts_entity_1 = require("./entities/emergencyContacts.entity");
const LicenseAlert_service_1 = require("./LicenseAlert.service");
const mailer_module_1 = require("../mailer/mailer.module");
const examenPreocupacional_entity_1 = require("./entities/examenPreocupacional.entity");
const users_module_1 = require("../users/users.module");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                employee_entity_1.Empleado,
                license_entity_1.Licencias,
                emergencyContacts_entity_1.ContactosEmergencia,
                license_entity_1.Licencias,
                examenPreocupacional_entity_1.ExamenPreocupacional,
            ]),
            roles_module_1.RolesModule,
            mailer_module_1.MailerModule,
            users_module_1.UsersModule,
        ],
        controllers: [employees_controller_1.EmployeesController],
        providers: [employees_service_1.EmployeesService, LicenseAlert_service_1.LicenseAlertService],
        exports: [employees_service_1.EmployeesService],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map