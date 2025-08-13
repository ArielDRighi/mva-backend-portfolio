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
exports.Claim = exports.TipoReclamo = exports.PrioridadReclamo = exports.EstadoReclamo = void 0;
const typeorm_1 = require("typeorm");
var EstadoReclamo;
(function (EstadoReclamo) {
    EstadoReclamo["PENDIENTE"] = "pending";
    EstadoReclamo["EN_PROGRESO"] = "in_progress";
    EstadoReclamo["RESUELTO"] = "resolved";
    EstadoReclamo["CERRADO"] = "closed";
    EstadoReclamo["RECHAZADO"] = "rejected";
})(EstadoReclamo || (exports.EstadoReclamo = EstadoReclamo = {}));
var PrioridadReclamo;
(function (PrioridadReclamo) {
    PrioridadReclamo["BAJA"] = "low";
    PrioridadReclamo["MEDIA"] = "medium";
    PrioridadReclamo["ALTA"] = "high";
    PrioridadReclamo["CRITICA"] = "critical";
})(PrioridadReclamo || (exports.PrioridadReclamo = PrioridadReclamo = {}));
var TipoReclamo;
(function (TipoReclamo) {
    TipoReclamo["CALIDAD_SERVICIO"] = "service_quality";
    TipoReclamo["DEMORA"] = "delay";
    TipoReclamo["PAGOS"] = "billing";
    TipoReclamo["EMPLEADO"] = "staff_behavior";
    TipoReclamo["PRODUCTO_DEFECTUOSO"] = "product_defect";
    TipoReclamo["OTROS"] = "other";
})(TipoReclamo || (exports.TipoReclamo = TipoReclamo = {}));
let Claim = class Claim {
};
exports.Claim = Claim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'reclamo_id' }),
    __metadata("design:type", Number)
], Claim.prototype, "reclamo_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente' }),
    __metadata("design:type", String)
], Claim.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'titulo', length: 150 }),
    __metadata("design:type", String)
], Claim.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text' }),
    __metadata("design:type", String)
], Claim.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tipo_reclamo',
        type: 'enum',
        enum: TipoReclamo,
        default: TipoReclamo.OTROS,
    }),
    __metadata("design:type", String)
], Claim.prototype, "tipoReclamo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'prioridad',
        type: 'enum',
        enum: PrioridadReclamo,
        default: PrioridadReclamo.MEDIA,
    }),
    __metadata("design:type", String)
], Claim.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: EstadoReclamo,
        default: EstadoReclamo.PENDIENTE,
    }),
    __metadata("design:type", String)
], Claim.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Claim.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_incidente', type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Claim.prototype, "fechaIncidente", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion' }),
    __metadata("design:type", Date)
], Claim.prototype, "fechaActualiacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_resolucion', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Claim.prototype, "fechaResolucion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'respuesta', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "respuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accion_tomada', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "accionTomada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'adjuntos_urls', type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Claim.prototype, "adjuntosUrls", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'satisfaccion_cliente', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Claim.prototype, "satisfaccionCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_urgente', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Claim.prototype, "esUrgente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requiere_compensacion', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Claim.prototype, "requiereCompensacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compensacion_detalles', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "compensacionDetalles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notas_internas', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "notasInternas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empleado_asignado', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "empleadoAsignado", void 0);
exports.Claim = Claim = __decorate([
    (0, typeorm_1.Entity)({ name: 'claims' })
], Claim);
//# sourceMappingURL=claim.entity.js.map