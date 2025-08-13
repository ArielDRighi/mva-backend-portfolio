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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../clients/entities/client.entity");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
const resource_assignment_entity_1 = require("./resource-assignment.entity");
const futureCleanings_entity_1 = require("../../future_cleanings/entities/futureCleanings.entity");
let Service = class Service {
    constructor() {
        this.cantidadEmpleados = 2;
    }
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'servicio_id' }),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id', nullable: true }),
    __metadata("design:type", Number)
], Service.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Cliente, (cliente) => cliente.servicios),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", client_entity_1.Cliente)
], Service.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_programada', type: 'timestamp' }),
    __metadata("design:type", Date)
], Service.prototype, "fechaProgramada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Service.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Service.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tipo_servicio',
        type: 'enum',
        enum: resource_states_enum_1.ServiceType,
        default: resource_states_enum_1.ServiceType.INSTALACION,
    }),
    __metadata("design:type", String)
], Service.prototype, "tipoServicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: resource_states_enum_1.ServiceState,
        default: resource_states_enum_1.ServiceState.PROGRAMADO,
    }),
    __metadata("design:type", String)
], Service.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_banos', default: 1 }),
    __metadata("design:type", Number)
], Service.prototype, "cantidadBanos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_empleados', default: 2 }),
    __metadata("design:type", Number)
], Service.prototype, "cantidadEmpleados", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_vehiculos', default: 1 }),
    __metadata("design:type", Number)
], Service.prototype, "cantidadVehiculos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ubicacion', type: 'text' }),
    __metadata("design:type", String)
], Service.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notas', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asignacion_automatica', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Service.prototype, "asignacionAutomatica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Service.prototype, "banosInstalados", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Service.prototype, "condicionContractualId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Service.prototype, "fechaFinAsignacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Service.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comentario_incompleto', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "comentarioIncompleto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_assignment_entity_1.ResourceAssignment, (assignment) => assignment.servicio, {
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], Service.prototype, "asignaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => futureCleanings_entity_1.FuturasLimpiezas, (futuraLimpieza) => futuraLimpieza.servicio),
    __metadata("design:type", Array)
], Service.prototype, "futurasLimpiezas", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)({ name: 'servicios' })
], Service);
//# sourceMappingURL=service.entity.js.map