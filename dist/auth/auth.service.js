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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);
        console.log('Usuario encontrado:', user);
        console.log('Contraseña proporcionada:', password);
        if (!user || !(await user.comparePassword(password))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (user.estado !== 'ACTIVO') {
            throw new common_1.UnauthorizedException('Usuario inactivo');
        }
        const payload = {
            sub: user.id,
            nombre: user.nombre,
            email: user.email,
            roles: user.roles || [],
            empleadoId: user.empleadoId,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                empleadoId: user.empleadoId,
                estado: user.estado,
                roles: user.roles || [],
            },
        };
    }
    async forgotPassword(emailDto) {
        const { email } = emailDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const newPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(user.id, hashedPassword);
        return {
            user: {
                email: user.email,
                nombre: user.nombre,
                newPassword,
            },
        };
    }
    async resetPassword(data, userId) {
        const { oldPassword, newPassword } = data;
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        console.log('user', user);
        console.log('oldPassword', oldPassword);
        console.log('user.password', user.password);
        console.log('newPassword', newPassword);
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Contraseña anterior incorrecta');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(user.id, hashedNewPassword);
        return {
            user: {
                email: user.email,
                nombre: user.nombre,
                newPassword,
            },
        };
    }
    generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 10; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map