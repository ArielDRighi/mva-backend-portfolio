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
exports.ToiletMaintenance = void 0;
const chemical_toilet_entity_1 = require("../../chemical_toilets/entities/chemical_toilet.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const typeorm_1 = require("typeorm");
let ToiletMaintenance = class ToiletMaintenance {
};
exports.ToiletMaintenance = ToiletMaintenance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'mantenimiento_id' }),
    __metadata("design:type", Number)
], ToiletMaintenance.prototype, "mantenimiento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fecha_mantenimiento',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ToiletMaintenance.prototype, "fecha_mantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ToiletMaintenance.prototype, "tipo_mantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ToiletMaintenance.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ToiletMaintenance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'empleado_id' }),
    __metadata("design:type", employee_entity_1.Empleado)
], ToiletMaintenance.prototype, "tecnicoResponsable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ToiletMaintenance.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chemical_toilet_entity_1.ChemicalToilet, (toilet) => toilet.maintenances),
    __metadata("design:type", chemical_toilet_entity_1.ChemicalToilet)
], ToiletMaintenance.prototype, "toilet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completado', default: false }),
    __metadata("design:type", Boolean)
], ToiletMaintenance.prototype, "completado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_completado', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ToiletMaintenance.prototype, "fechaCompletado", void 0);
exports.ToiletMaintenance = ToiletMaintenance = __decorate([
    (0, typeorm_1.Entity)({ name: 'toilet_maintenance' })
], ToiletMaintenance);
//# sourceMappingURL=toilet_maintenance.entity.js.map