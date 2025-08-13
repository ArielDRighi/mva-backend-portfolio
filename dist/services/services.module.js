"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const resource_assignment_entity_1 = require("./entities/resource-assignment.entity");
const services_service_1 = require("./services.service");
const services_controller_1 = require("./services.controller");
const clients_module_1 = require("../clients/clients.module");
const employees_module_1 = require("../employees/employees.module");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const chemical_toilets_module_1 = require("../chemical_toilets/chemical_toilets.module");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const vehicle_maintenance_module_1 = require("../vehicle_maintenance/vehicle_maintenance.module");
const toilet_maintenance_module_1 = require("../toilet_maintenance/toilet_maintenance.module");
const employee_entity_1 = require("../employees/entities/employee.entity");
const contractual_conditions_entity_1 = require("../contractual_conditions/entities/contractual_conditions.entity");
const employee_leaves_module_1 = require("../employee_leaves/employee-leaves.module");
const futureCleanings_entity_1 = require("../future_cleanings/entities/futureCleanings.entity");
const futureCleanings_service_1 = require("../future_cleanings/futureCleanings.service");
const client_entity_1 = require("../clients/entities/client.entity");
const mailer_module_1 = require("../mailer/mailer.module");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                service_entity_1.Service,
                resource_assignment_entity_1.ResourceAssignment,
                employee_entity_1.Empleado,
                vehicle_entity_1.Vehicle,
                chemical_toilet_entity_1.ChemicalToilet,
                contractual_conditions_entity_1.CondicionesContractuales,
                futureCleanings_entity_1.FuturasLimpiezas,
                client_entity_1.Cliente,
            ]),
            (0, common_1.forwardRef)(() => clients_module_1.ClientsModule),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
            (0, common_1.forwardRef)(() => vehicles_module_1.VehiclesModule),
            (0, common_1.forwardRef)(() => chemical_toilets_module_1.ChemicalToiletsModule),
            (0, common_1.forwardRef)(() => vehicle_maintenance_module_1.VehicleMaintenanceModule),
            (0, common_1.forwardRef)(() => toilet_maintenance_module_1.ToiletMaintenanceModule),
            employee_leaves_module_1.EmployeeLeavesModule,
            mailer_module_1.MailerModule,
        ],
        controllers: [services_controller_1.ServicesController],
        providers: [services_service_1.ServicesService, futureCleanings_service_1.FutureCleaningsService],
        exports: [services_service_1.ServicesService],
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map