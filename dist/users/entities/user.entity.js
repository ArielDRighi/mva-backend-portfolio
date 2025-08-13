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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../../roles/enums/role.enum");
let User = class User {
    async comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empleado_id', nullable: true }),
    (0, typeorm_1.Index)('idx_usuarios_empleado'),
    __metadata("design:type", Number)
], User.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    (0, typeorm_1.Index)('idx_usuarios_username'),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    (0, typeorm_1.Index)('idx_usuarios_email'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'ACTIVO' }),
    __metadata("design:type", String)
], User.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
        default: '{}',
        transformer: {
            from: (value) => value,
            to: (value) => (Array.isArray(value) ? value : [role_enum_1.Role.OPERARIO]),
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map