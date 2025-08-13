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
exports.CreateFullEmployeeDto = exports.CreateEmployeeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_contact_emergency_dto_1 = require("./create_contact_emergency.dto");
const create_license_dto_1 = require("./create_license.dto");
const create_examen_dto_1 = require("./create_examen.dto");
class CreateEmployeeDto {
    constructor() {
        this.estado = 'DISPONIBLE';
    }
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    (0, class_validator_1.Length)(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido' }),
    (0, class_validator_1.Length)(2, 100, {
        message: 'El apellido debe tener entre 2 y 100 caracteres',
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El documento es requerido' }),
    (0, class_validator_1.Length)(5, 20, { message: 'El documento debe tener entre 5 y 20 caracteres' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "documento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El teléfono es requerido' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "direccion", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return new Date(value).toISOString();
        }
        return value;
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return new Date(value).toISOString();
        }
        return value;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de contratación es requerida' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "fecha_contratacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El cargo es requerido' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "cargo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "numero_legajo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(11, 20, { message: 'El CUIL debe tener entre 11 y 20 caracteres' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "cuil", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(22, 22, { message: 'El CBU debe tener exactamente 22 dígitos' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "cbu", void 0);
class CreateFullEmployeeDto extends CreateEmployeeDto {
}
exports.CreateFullEmployeeDto = CreateFullEmployeeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_contact_emergency_dto_1.CreateContactEmergencyDto),
    __metadata("design:type", Array)
], CreateFullEmployeeDto.prototype, "emergencyContacts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_license_dto_1.CreateLicenseDto),
    __metadata("design:type", create_license_dto_1.CreateLicenseDto)
], CreateFullEmployeeDto.prototype, "licencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_examen_dto_1.CreateExamenPreocupacionalDto),
    __metadata("design:type", create_examen_dto_1.CreateExamenPreocupacionalDto)
], CreateFullEmployeeDto.prototype, "examenPreocupacional", void 0);
//# sourceMappingURL=create_employee.dto.js.map