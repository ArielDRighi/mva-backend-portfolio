"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractualConditionsModule = void 0;
const contractual_conditions_service_1 = require("./contractual_conditions.service");
const common_1 = require("@nestjs/common");
const contractual_conditions_controller_1 = require("./contractual_conditions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const contractual_conditions_entity_1 = require("./entities/contractual_conditions.entity");
const client_entity_1 = require("../clients/entities/client.entity");
let ContractualConditionsModule = class ContractualConditionsModule {
};
exports.ContractualConditionsModule = ContractualConditionsModule;
exports.ContractualConditionsModule = ContractualConditionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contractual_conditions_entity_1.CondicionesContractuales, client_entity_1.Cliente])],
        controllers: [contractual_conditions_controller_1.ContractualConditionsController],
        providers: [contractual_conditions_service_1.ContractualConditionsService],
        exports: [contractual_conditions_service_1.ContractualConditionsService],
    })
], ContractualConditionsModule);
//# sourceMappingURL=contractual_conditions.module.js.map