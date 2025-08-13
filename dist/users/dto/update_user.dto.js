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
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../../roles/enums/role.enum");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 50, {
        message: 'El nombre de usuario debe tener entre 3 y 50 caracteres',
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9._-]+$/, {
        message: 'El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Formato de correo electrónico inválido' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(6, 30, {
        message: 'La contraseña debe tener entre 6 y 30 caracteres',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/(ACTIVO|INACTIVO)/, {
        message: 'El estado debe ser ACTIVO o INACTIVO',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "roles", void 0);
//# sourceMappingURL=update_user.dto.js.map