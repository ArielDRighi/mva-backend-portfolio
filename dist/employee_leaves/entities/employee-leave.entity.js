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
exports.EmployeeLeave = exports.LeaveType = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employees/entities/employee.entity");
var LeaveType;
(function (LeaveType) {
    LeaveType["ENFERMEDAD"] = "ENFERMEDAD";
    LeaveType["FALLECIMIENTO_FAMILIAR"] = "FALLECIMIENTO_FAMILIAR";
    LeaveType["CASAMIENTO"] = "CASAMIENTO";
    LeaveType["NACIMIENTO"] = "NACIMIENTO";
    LeaveType["VACACIONES"] = "VACACIONES";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
let EmployeeLeave = class EmployeeLeave {
    constructor() {
        this.aprobado = null;
    }
};
exports.EmployeeLeave = EmployeeLeave;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeLeave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Empleado, (empleado) => empleado.leaves),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Empleado)
], EmployeeLeave.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", Number)
], EmployeeLeave.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EmployeeLeave.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EmployeeLeave.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LeaveType,
        default: LeaveType.VACACIONES,
    }),
    __metadata("design:type", String)
], EmployeeLeave.prototype, "tipoLicencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmployeeLeave.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmployeeLeave.prototype, "comentarioRechazo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Boolean)
], EmployeeLeave.prototype, "aprobado", void 0);
exports.EmployeeLeave = EmployeeLeave = __decorate([
    (0, typeorm_1.Entity)('employee_leaves')
], EmployeeLeave);
//# sourceMappingURL=employee-leave.entity.js.map