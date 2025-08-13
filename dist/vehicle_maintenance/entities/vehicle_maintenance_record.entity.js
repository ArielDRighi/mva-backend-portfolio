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
exports.VehicleMaintenanceRecord = void 0;
const typeorm_1 = require("typeorm");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
let VehicleMaintenanceRecord = class VehicleMaintenanceRecord {
};
exports.VehicleMaintenanceRecord = VehicleMaintenanceRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'mantenimiento_id' }),
    __metadata("design:type", Number)
], VehicleMaintenanceRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehiculo_id' }),
    __metadata("design:type", Number)
], VehicleMaintenanceRecord.prototype, "vehiculoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_mantenimiento', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VehicleMaintenanceRecord.prototype, "fechaMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_mantenimiento' }),
    __metadata("design:type", String)
], VehicleMaintenanceRecord.prototype, "tipoMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", String)
], VehicleMaintenanceRecord.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'costo', type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], VehicleMaintenanceRecord.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proximo_mantenimiento', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], VehicleMaintenanceRecord.prototype, "proximoMantenimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.maintenanceRecords),
    (0, typeorm_1.JoinColumn)({ name: 'vehiculo_id' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], VehicleMaintenanceRecord.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completado', default: false }),
    __metadata("design:type", Boolean)
], VehicleMaintenanceRecord.prototype, "completado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_completado', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VehicleMaintenanceRecord.prototype, "fechaCompletado", void 0);
exports.VehicleMaintenanceRecord = VehicleMaintenanceRecord = __decorate([
    (0, typeorm_1.Entity)({ name: 'vehicle_maintenance' })
], VehicleMaintenanceRecord);
//# sourceMappingURL=vehicle_maintenance_record.entity.js.map