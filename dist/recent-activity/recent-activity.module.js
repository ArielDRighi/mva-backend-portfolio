"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentActivityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recent_activity_service_1 = require("./recent-activity.service");
const recent_activity_controller_1 = require("./recent-activity.controller");
const service_entity_1 = require("../services/entities/service.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const toilet_maintenance_entity_1 = require("../toilet_maintenance/entities/toilet_maintenance.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
let RecentActivityModule = class RecentActivityModule {
};
exports.RecentActivityModule = RecentActivityModule;
exports.RecentActivityModule = RecentActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                service_entity_1.Service,
                client_entity_1.Cliente,
                chemical_toilet_entity_1.ChemicalToilet,
                toilet_maintenance_entity_1.ToiletMaintenance,
                vehicle_entity_1.Vehicle,
            ]),
        ],
        controllers: [recent_activity_controller_1.RecentActivityController],
        providers: [recent_activity_service_1.RecentActivityService],
    })
], RecentActivityModule);
//# sourceMappingURL=recent-activity.module.js.map