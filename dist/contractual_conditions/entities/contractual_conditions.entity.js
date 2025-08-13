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
exports.CondicionesContractuales = exports.EstadoContrato = exports.Periodicidad = void 0;
const class_validator_1 = require("class-validator");
const client_entity_1 = require("../../clients/entities/client.entity");
const typeorm_1 = require("typeorm");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
var Periodicidad;
(function (Periodicidad) {
    Periodicidad["DIARIA"] = "Diaria";
    Periodicidad["DOS_VECES_SEMANA"] = "Dos veces por semana";
    Periodicidad["TRES_VECES_SEMANA"] = "Tres veces por semana";
    Periodicidad["CUATRO_VECES_SEMANA"] = "Cuatro veces por semana";
    Periodicidad["SEMANAL"] = "Semanal";
    Periodicidad["QUINCENAL"] = "Quincenal";
    Periodicidad["MENSUAL"] = "Mensual";
    Periodicidad["ANUAL"] = "Anual";
})(Periodicidad || (exports.Periodicidad = Periodicidad = {}));
var EstadoContrato;
(function (EstadoContrato) {
    EstadoContrato["ACTIVO"] = "Activo";
    EstadoContrato["INACTIVO"] = "Inactivo";
    EstadoContrato["TERMINADO"] = "Terminado";
})(EstadoContrato || (exports.EstadoContrato = EstadoContrato = {}));
let CondicionesContractuales = class CondicionesContractuales {
};
exports.CondicionesContractuales = CondicionesContractuales;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'condicionContractual_id' }),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "condicionContractualId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Cliente, (cliente) => cliente.contratos, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", client_entity_1.Cliente)
], CondicionesContractuales.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date', nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CondicionesContractuales.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'date', nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CondicionesContractuales.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'condiciones_especificas', type: 'text', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 500),
    __metadata("design:type", String)
], CondicionesContractuales.prototype, "condiciones_especificas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tarifa',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "tarifa", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tarifa_alquiler',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "tarifa_alquiler", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tarifa_instalacion',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "tarifa_instalacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tarifa_limpieza',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "tarifa_limpieza", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tipo_servicio',
        type: 'enum',
        enum: resource_states_enum_1.ServiceType,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(resource_states_enum_1.ServiceType),
    __metadata("design:type", String)
], CondicionesContractuales.prototype, "tipo_servicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad_banos',
        type: 'int',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CondicionesContractuales.prototype, "cantidad_banos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'periodicidad',
        type: 'enum',
        enum: Periodicidad,
        nullable: false,
    }),
    (0, class_validator_1.IsEnum)(Periodicidad),
    __metadata("design:type", String)
], CondicionesContractuales.prototype, "periodicidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: EstadoContrato,
        default: EstadoContrato.ACTIVO,
    }),
    (0, class_validator_1.IsEnum)(EstadoContrato),
    __metadata("design:type", String)
], CondicionesContractuales.prototype, "estado", void 0);
exports.CondicionesContractuales = CondicionesContractuales = __decorate([
    (0, typeorm_1.Entity)({ name: 'contractual_conditions' })
], CondicionesContractuales);
//# sourceMappingURL=contractual_conditions.entity.js.map