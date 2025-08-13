"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LicenseAlertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseAlertService = void 0;
const mailer_service_1 = require("../mailer/mailer.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const license_entity_1 = require("./entities/license.entity");
const schedule_1 = require("@nestjs/schedule");
let LicenseAlertService = LicenseAlertService_1 = class LicenseAlertService {
    constructor(licenciasRepository, mailerService) {
        this.licenciasRepository = licenciasRepository;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(LicenseAlertService_1.name);
    }
    async checkExpiringLicenses() {
        this.logger.log('Verificando licencias próximas a vencer...');
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        const expiringLicenses = await this.licenciasRepository.find({
            where: {
                fecha_vencimiento: (0, typeorm_2.Between)(today, thirtyDaysFromNow),
            },
            relations: ['empleado'],
        });
        if (expiringLicenses.length > 0) {
            this.logger.log(`Se encontraron ${expiringLicenses.length} licencias próximas a vencer`);
            await this.sendExpiringLicenseNotifications(expiringLicenses);
        }
        else {
            this.logger.log('No hay licencias próximas a vencer');
        }
    }
    async sendExpiringLicenseNotifications(licenses) {
        const adminEmails = await this.mailerService.getAdminEmails();
        const supervisorEmails = await this.mailerService.getSupervisorEmails();
        await this.mailerService.sendExpiringLicenseAlert(adminEmails, supervisorEmails, licenses);
    }
};
exports.LicenseAlertService = LicenseAlertService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LicenseAlertService.prototype, "checkExpiringLicenses", null);
exports.LicenseAlertService = LicenseAlertService = LicenseAlertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(license_entity_1.Licencias)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_service_1.MailerService])
], LicenseAlertService);
//# sourceMappingURL=LicenseAlert.service.js.map