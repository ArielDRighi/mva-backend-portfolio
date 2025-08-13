"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsPortalModule = void 0;
const common_1 = require("@nestjs/common");
const clientsPortal_controller_1 = require("./clientsPortal.controller");
const clientsPortal_service_1 = require("./clientsPortal.service");
const typeorm_1 = require("@nestjs/typeorm");
const satisfactionSurvey_entity_1 = require("./entities/satisfactionSurvey.entity");
const claim_entity_1 = require("./entities/claim.entity");
const mailer_module_1 = require("../mailer/mailer.module");
let ClientsPortalModule = class ClientsPortalModule {
};
exports.ClientsPortalModule = ClientsPortalModule;
exports.ClientsPortalModule = ClientsPortalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([satisfactionSurvey_entity_1.SatisfactionSurvey, claim_entity_1.Claim]),
            mailer_module_1.MailerModule,
        ],
        controllers: [clientsPortal_controller_1.ClientsPortalController],
        providers: [clientsPortal_service_1.ClientsPortalService],
        exports: [clientsPortal_service_1.ClientsPortalService],
    })
], ClientsPortalModule);
//# sourceMappingURL=clientsPortal.module.js.map