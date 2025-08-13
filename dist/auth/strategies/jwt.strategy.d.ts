import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../roles/enums/role.enum';
interface JwtPayload {
    sub: number;
    nombre: string;
    email: string;
    empleadoId: number;
    roles: Role[];
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): {
        userId: number;
        username: string;
        email: string;
        roles: Role[];
        empleadoId: number;
    };
}
export {};
