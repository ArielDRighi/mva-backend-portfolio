"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChemicalToiletsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chemical_toilet_entity_1 = require("./entities/chemical_toilet.entity");
const chemical_toilets_service_1 = require("./chemical_toilets.service");
const chemical_toilets_controller_1 = require("./chemical_toilets.controller");
const toilet_maintenance_module_1 = require("../toilet_maintenance/toilet_maintenance.module");
const service_entity_1 = require("../services/entities/service.entity");
let ChemicalToiletsModule = class ChemicalToiletsModule {
};
exports.ChemicalToiletsModule = ChemicalToiletsModule;
exports.ChemicalToiletsModule = ChemicalToiletsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chemical_toilet_entity_1.ChemicalToilet, service_entity_1.Service]),
            (0, common_1.forwardRef)(() => toilet_maintenance_module_1.ToiletMaintenanceModule),
        ],
        controllers: [chemical_toilets_controller_1.ChemicalToiletsController],
        providers: [chemical_toilets_service_1.ChemicalToiletsService],
        exports: [chemical_toilets_service_1.ChemicalToiletsService],
    })
], ChemicalToiletsModule);
//# sourceMappingURL=chemical_toilets.module.js.map