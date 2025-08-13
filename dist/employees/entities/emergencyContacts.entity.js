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
exports.ContactosEmergencia = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let ContactosEmergencia = class ContactosEmergencia {
};
exports.ContactosEmergencia = ContactosEmergencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactosEmergencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 100 }),
    __metadata("design:type", String)
], ContactosEmergencia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido', length: 100 }),
    __metadata("design:type", String)
], ContactosEmergencia.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parentesco', length: 50 }),
    __metadata("design:type", String)
], ContactosEmergencia.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', length: 20 }),
    __metadata("design:type", String)
], ContactosEmergencia.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, (empleado) => empleado.emergencyContacts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", employee_entity_1.Empleado)
], ContactosEmergencia.prototype, "empleado", void 0);
exports.ContactosEmergencia = ContactosEmergencia = __decorate([
    (0, typeorm_1.Entity)({ name: 'emergency_contacts' })
], ContactosEmergencia);
//# sourceMappingURL=emergencyContacts.entity.js.map