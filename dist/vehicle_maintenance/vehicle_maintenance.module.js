"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleMaintenanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicle_maintenance_record_entity_1 = require("./entities/vehicle_maintenance_record.entity");
const vehicle_maintenance_service_1 = require("./vehicle_maintenance.service");
const vehicle_maintenance_controller_1 = require("./vehicle_maintenance.controller");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const roles_module_1 = require("../roles/roles.module");
let VehicleMaintenanceModule = class VehicleMaintenanceModule {
};
exports.VehicleMaintenanceModule = VehicleMaintenanceModule;
exports.VehicleMaintenanceModule = VehicleMaintenanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vehicle_maintenance_record_entity_1.VehicleMaintenanceRecord]),
            vehicles_module_1.VehiclesModule,
            roles_module_1.RolesModule,
        ],
        controllers: [vehicle_maintenance_controller_1.VehicleMaintenanceController],
        providers: [vehicle_maintenance_service_1.VehicleMaintenanceService],
        exports: [vehicle_maintenance_service_1.VehicleMaintenanceService],
    })
], VehicleMaintenanceModule);
//# sourceMappingURL=vehicle_maintenance.module.js.map