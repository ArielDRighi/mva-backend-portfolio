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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const contractual_conditions_entity_1 = require("../../contractual_conditions/entities/contractual_conditions.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const futureCleanings_entity_1 = require("../../future_cleanings/entities/futureCleanings.entity");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'cliente_id' }),
    __metadata("design:type", Number)
], Cliente.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_empresa' }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cuit', unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "cuit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion' }),
    __metadata("design:type", String)
], Cliente.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono' }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_principal' }),
    __metadata("design:type", String)
], Cliente.prototype, "contacto_principal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_principal_telefono', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "contacto_principal_telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_obra1', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "contactoObra1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_obra1_telefono', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "contacto_obra1_telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_obra2', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "contactoObra2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto_obra2_telefono', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "contacto_obra2_telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fecha_registro',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Cliente.prototype, "fecha_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', default: 'ACTIVO' }),
    __metadata("design:type", String)
], Cliente.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contractual_conditions_entity_1.CondicionesContractuales, (condicion) => condicion.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (servicio) => servicio.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "servicios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => futureCleanings_entity_1.FuturasLimpiezas, (futuraLimpieza) => futuraLimpieza.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "futurasLimpiezas", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)({ name: 'clients' })
], Cliente);
//# sourceMappingURL=client.entity.js.map