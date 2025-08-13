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
exports.ExamenPreocupacional = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let ExamenPreocupacional = class ExamenPreocupacional {
};
exports.ExamenPreocupacional = ExamenPreocupacional;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExamenPreocupacional.prototype, "examen_preocupacional_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ExamenPreocupacional.prototype, "fecha_examen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamenPreocupacional.prototype, "resultado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamenPreocupacional.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamenPreocupacional.prototype, "realizado_por", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, (empleado) => empleado.examenesPreocupacionales),
    (0, typeorm_1.JoinColumn)({ name: 'empleado_id' }),
    __metadata("design:type", employee_entity_1.Empleado)
], ExamenPreocupacional.prototype, "empleado", void 0);
exports.ExamenPreocupacional = ExamenPreocupacional = __decorate([
    (0, typeorm_1.Entity)({ name: 'examen_preocupacional' })
], ExamenPreocupacional);
//# sourceMappingURL=examenPreocupacional.entity.js.map