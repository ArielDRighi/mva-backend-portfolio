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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuturasLimpiezas = void 0;
const client_entity_1 = require("../../clients/entities/client.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const typeorm_1 = require("typeorm");
let FuturasLimpiezas = class FuturasLimpiezas {
};
exports.FuturasLimpiezas = FuturasLimpiezas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'limpieza_id' }),
    __metadata("design:type", Number)
], FuturasLimpiezas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Cliente, (cliente) => cliente.futurasLimpiezas),
    __metadata("design:type", client_entity_1.Cliente)
], FuturasLimpiezas.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'limpieza_fecha' }),
    __metadata("design:type", Date)
], FuturasLimpiezas.prototype, "fecha_de_limpieza", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isActive', default: true }),
    __metadata("design:type", Boolean)
], FuturasLimpiezas.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_de_limpieza' }),
    __metadata("design:type", Number)
], FuturasLimpiezas.prototype, "numero_de_limpieza", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.futurasLimpiezas, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", service_entity_1.Service)
], FuturasLimpiezas.prototype, "servicio", void 0);
exports.FuturasLimpiezas = FuturasLimpiezas = __decorate([
    (0, typeorm_1.Entity)({ name: 'future_cleanings' })
], FuturasLimpiezas);
//# sourceMappingURL=futureCleanings.entity.js.map