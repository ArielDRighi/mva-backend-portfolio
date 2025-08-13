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
exports.FamilyMember = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let FamilyMember = class FamilyMember {
};
exports.FamilyMember = FamilyMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FamilyMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 100 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido', length: 100 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parentesco', length: 50 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dni', length: 20 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date' }),
    __metadata("design:type", Date)
], FamilyMember.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, (empleado) => empleado.familyMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleado_id' }),
    __metadata("design:type", employee_entity_1.Empleado)
], FamilyMember.prototype, "empleado", void 0);
exports.FamilyMember = FamilyMember = __decorate([
    (0, typeorm_1.Entity)({ name: 'family_members' })
], FamilyMember);
//# sourceMappingURL=familyMembers.entity.js.map