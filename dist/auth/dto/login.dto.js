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
exports.ChangePasswordDto = exports.ForgotPasswordDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El email del usuario es requerido' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class ForgotPasswordDto {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es requerido' }),
    (0, class_validator_1.IsString)({ message: 'El correo electrónico debe ser una cadena' }),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña actual es requerida' }),
    (0, class_validator_1.IsString)({ message: 'La contraseña actual debe ser una cadena' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La nueva contraseña es requerida' }),
    (0, class_validator_1.IsString)({ message: 'La nueva contraseña debe ser una cadena' }),
    (0, class_validator_1.Matches)(/[a-z]/, {
        message: 'La contraseña debe contener al menos una letra minúscula',
    }),
    (0, class_validator_1.Matches)(/[A-Z]/, {
        message: 'La contraseña debe contener al menos una letra mayúscula',
    }),
    (0, class_validator_1.Matches)(/\d/, {
        message: 'La contraseña debe contener al menos un número',
    }),
    (0, class_validator_1.Matches)(/^.{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres',
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=login.dto.js.map