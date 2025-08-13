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
exports.Vehicle = exports.TipoCabina = void 0;
const typeorm_1 = require("typeorm");
const vehicle_maintenance_record_entity_1 = require("../../vehicle_maintenance/entities/vehicle_maintenance_record.entity");
var TipoCabina;
(function (TipoCabina) {
    TipoCabina["SIMPLE"] = "simple";
    TipoCabina["DOBLE"] = "doble";
})(TipoCabina || (exports.TipoCabina = TipoCabina = {}));
let Vehicle = class Vehicle {
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'vehiculo_id' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_interno', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "numeroInterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'placa', unique: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "placa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marca' }),
    __metadata("design:type", String)
], Vehicle.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'modelo' }),
    __metadata("design:type", String)
], Vehicle.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'año' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tipo_cabina',
        type: 'enum',
        enum: TipoCabina,
        default: TipoCabina.SIMPLE,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "tipoCabina", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento_vtv', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "fechaVencimientoVTV", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento_seguro', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "fechaVencimientoSeguro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_externo', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "esExterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', default: 'ACTIVO' }),
    __metadata("design:type", String)
], Vehicle.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_maintenance_record_entity_1.VehicleMaintenanceRecord, (maintenanceRecord) => maintenanceRecord.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "maintenanceRecords", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)({ name: 'vehicles' })
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map