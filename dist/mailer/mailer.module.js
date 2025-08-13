"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("./mailer.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const license_entity_1 = require("../employees/entities/license.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, license_entity_1.Licencias, chemical_toilet_entity_1.ChemicalToilet])],
        providers: [mailer_service_1.MailerService],
        exports: [mailer_service_1.MailerService],
    })
], MailerModule);
//# sourceMappingURL=mailer.module.js.map