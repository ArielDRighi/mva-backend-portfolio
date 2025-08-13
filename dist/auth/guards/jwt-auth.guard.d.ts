import { ExecutionContext } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly logger;
    handleRequest<T = any>(err: any, user: any, info: any, context: ExecutionContext): T;
}
export {};
