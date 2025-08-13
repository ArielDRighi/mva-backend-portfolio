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
exports.ResourceAssignment = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const chemical_toilet_entity_1 = require("../../chemical_toilets/entities/chemical_toilet.entity");
const class_transformer_1 = require("class-transformer");
let ResourceAssignment = class ResourceAssignment {
    getTipoRecurso() {
        if (this.empleadoId && !this.vehiculoId && !this.banoId)
            return 'empleado';
        if (!this.empleadoId && this.vehiculoId && !this.banoId)
            return 'vehiculo';
        if (!this.empleadoId && !this.vehiculoId && this.banoId)
            return 'bano';
        return 'mixto';
    }
};
exports.ResourceAssignment = ResourceAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'asignacion_id' }),
    __metadata("design:type", Number)
], ResourceAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'servicio_id' }),
    __metadata("design:type", Number)
], ResourceAssignment.prototype, "servicioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (servicio) => servicio.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: 'servicio_id' }),
    __metadata("design:type", service_entity_1.Service)
], ResourceAssignment.prototype, "servicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empleado_id', nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", Number)
], ResourceAssignment.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'empleado_id' }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", employee_entity_1.Empleado)
], ResourceAssignment.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rol_empleado',
        type: 'enum',
        enum: ['A', 'B'],
        nullable: true,
    }),
    __metadata("design:type", String)
], ResourceAssignment.prototype, "rolEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehiculo_id', nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", Number)
], ResourceAssignment.prototype, "vehiculoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vehiculo_id' }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], ResourceAssignment.prototype, "vehiculo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bano_id', nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", Number)
], ResourceAssignment.prototype, "banoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chemical_toilet_entity_1.ChemicalToilet, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bano_id' }),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    __metadata("design:type", chemical_toilet_entity_1.ChemicalToilet)
], ResourceAssignment.prototype, "bano", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_asignacion' }),
    __metadata("design:type", Date)
], ResourceAssignment.prototype, "fechaAsignacion", void 0);
exports.ResourceAssignment = ResourceAssignment = __decorate([
    (0, typeorm_1.Entity)({ name: 'asignacion_recursos' })
], ResourceAssignment);
//# sourceMappingURL=resource-assignment.entity.js.map