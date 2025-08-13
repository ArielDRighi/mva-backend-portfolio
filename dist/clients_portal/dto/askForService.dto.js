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
exports.AskForServiceDto = void 0;
const class_validator_1 = require("class-validator");
var BathroomQuantity;
(function (BathroomQuantity) {
    BathroomQuantity["CHICO"] = "1-5";
    BathroomQuantity["MEDIANO"] = "5-10";
    BathroomQuantity["GRANDE"] = "+10";
})(BathroomQuantity || (BathroomQuantity = {}));
class AskForServiceDto {
}
exports.AskForServiceDto = AskForServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre completo es requerido' }),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "nombrePersona", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "rolPersona", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email valido' }),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El telefono es requerido' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la empresa es requerido' }),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "nombreEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "cuit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "rubroEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La zona / direccion es requerida' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "zonaDireccion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BathroomQuantity, { message: 'La cantidad debe ser 1-5, 5-10 o +10' }),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "cantidadBa\u00F1os", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "tipoEvento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "duracionAlquiler", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Formato de fecha inválido' }),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AskForServiceDto.prototype, "comentarios", void 0);
//# sourceMappingURL=askForService.dto.js.map