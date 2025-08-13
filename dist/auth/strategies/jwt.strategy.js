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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService) {
        const secret = configService.getOrThrow('jwt.secret');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.configService = configService;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
        this.logger.log('JWT Strategy initialized');
    }
    validate(payload) {
        this.logger.debug(`JWT Payload: ${JSON.stringify(payload)}`);
        if (!payload || !payload.sub) {
            this.logger.error('Invalid JWT payload');
            throw new common_1.UnauthorizedException('Invalid token');
        }
        if (!payload.roles || !Array.isArray(payload.roles)) {
            this.logger.warn(`JWT has no roles: ${JSON.stringify(payload)}`);
            payload.roles = [];
        }
        const user = {
            userId: payload.sub,
            username: payload.nombre,
            email: payload.email,
            roles: Array.isArray(payload.roles) ? payload.roles : [],
            empleadoId: payload.empleadoId,
        };
        this.logger.debug(`JWT validated successfully for user: ${user.username}`);
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map