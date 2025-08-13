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
exports.UpdateFamilyMemberDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateFamilyMemberDto {
}
exports.UpdateFamilyMemberDto = UpdateFamilyMemberDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 100, {
        message: 'El nombre debe tener entre 2 y 100 caracteres',
    }),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 100, {
        message: 'El apellido debe tener entre 2 y 100 caracteres',
    }),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 50, {
        message: 'El parentesco debe tener entre 2 y 50 caracteres',
    }),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "parentesco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(5, 20, {
        message: 'El DNI debe tener entre 5 y 20 caracteres',
    }),
    __metadata("design:type", String)
], UpdateFamilyMemberDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateFamilyMemberDto.prototype, "fecha_nacimiento", void 0);
//# sourceMappingURL=update_family_member.dto.js.map