"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FutureCleaningsModule = void 0;
const common_1 = require("@nestjs/common");
const futureCleanings_controller_1 = require("./futureCleanings.controller");
const futureCleanings_service_1 = require("./futureCleanings.service");
const typeorm_1 = require("@nestjs/typeorm");
const futureCleanings_entity_1 = require("./entities/futureCleanings.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const service_entity_1 = require("../services/entities/service.entity");
let FutureCleaningsModule = class FutureCleaningsModule {
};
exports.FutureCleaningsModule = FutureCleaningsModule;
exports.FutureCleaningsModule = FutureCleaningsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([futureCleanings_entity_1.FuturasLimpiezas, client_entity_1.Cliente, service_entity_1.Service])],
        controllers: [futureCleanings_controller_1.FutureCleaningsController],
        providers: [futureCleanings_service_1.FutureCleaningsService],
        exports: [futureCleanings_service_1.FutureCleaningsService],
    })
], FutureCleaningsModule);
//# sourceMappingURL=futureCleanings.module.js.map