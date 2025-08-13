"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    handleRequest(err, user, info, context) {
        this.logger.debug(`JWT Auth Guard - Error: ${JSON.stringify(err)}`);
        this.logger.debug(`JWT Auth Guard - User: ${JSON.stringify(user)}`);
        this.logger.debug(`JWT Auth Guard - Info: ${JSON.stringify(info)}`);
        if (err || !user) {
            this.logger.error(`JWT Auth Guard - Authentication failed: ${err && typeof err === 'object' && err !== null && 'message' in err ? String(err.message) : 'No user found'}`);
        }
        else {
            this.logger.debug('JWT Auth Guard - Authentication successful');
        }
        return super.handleRequest(err, user, info, context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map