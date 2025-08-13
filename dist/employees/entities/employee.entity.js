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
exports.Empleado = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const employee_leave_entity_1 = require("../../employee_leaves/entities/employee-leave.entity");
const salary_advance_entity_1 = require("../../salary_advance/entities/salary_advance.entity");
const clothing_entity_1 = require("../../clothing/entities/clothing.entity");
const emergencyContacts_entity_1 = require("./emergencyContacts.entity");
const license_entity_1 = require("./license.entity");
const examenPreocupacional_entity_1 = require("./examenPreocupacional.entity");
let Empleado = class Empleado {
};
exports.Empleado = Empleado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'empleado_id' }),
    __metadata("design:type", Number)
], Empleado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido', length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'documento', length: 20, unique: true }),
    __metadata("design:type", String)
], Empleado.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', length: 20 }),
    __metadata("design:type", String)
], Empleado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 100, unique: true }),
    __metadata("design:type", String)
], Empleado.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion', length: 200, nullable: true }),
    __metadata("design:type", String)
], Empleado.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Empleado.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_contratacion', type: 'date' }),
    __metadata("design:type", Date)
], Empleado.prototype, "fecha_contratacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cargo', length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', length: 20, default: 'DISPONIBLE' }),
    __metadata("design:type", String)
], Empleado.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Legajo',
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Empleado.prototype, "numero_legajo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CUIL', length: 20, unique: true, nullable: true }),
    __metadata("design:type", String)
], Empleado.prototype, "cuil", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CBU', length: 22, unique: true, nullable: true }),
    __metadata("design:type", String)
], Empleado.prototype, "cbu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => emergencyContacts_entity_1.ContactosEmergencia, (contact) => contact.empleado, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Empleado.prototype, "emergencyContacts", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => license_entity_1.Licencias, (licencia) => licencia.empleado, {
        nullable: true,
    }),
    __metadata("design:type", license_entity_1.Licencias)
], Empleado.prototype, "licencia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.empleadoId, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Empleado.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 14, type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "diasVacacionesTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 14, type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "diasVacacionesRestantes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "diasVacacionesUsados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_leave_entity_1.EmployeeLeave, (leave) => leave.employee),
    __metadata("design:type", Array)
], Empleado.prototype, "leaves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => salary_advance_entity_1.SalaryAdvance, (advance) => advance.employee),
    __metadata("design:type", Array)
], Empleado.prototype, "advances", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => clothing_entity_1.RopaTalles, (talleRopa) => talleRopa.empleado),
    __metadata("design:type", clothing_entity_1.RopaTalles)
], Empleado.prototype, "talleRopa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => examenPreocupacional_entity_1.ExamenPreocupacional, (examenPreocupacional) => examenPreocupacional.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "examenesPreocupacionales", void 0);
exports.Empleado = Empleado = __decorate([
    (0, typeorm_1.Entity)({ name: 'employees' })
], Empleado);
//# sourceMappingURL=employee.entity.js.map