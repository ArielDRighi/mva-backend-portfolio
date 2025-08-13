import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto, ForgotPasswordDto, LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    validateToken(token: string): any;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            empleadoId: number;
            estado: string;
            roles: import("../roles/enums/role.enum").Role[];
        };
    }>;
    forgotPassword(emailDto: ForgotPasswordDto): Promise<{
        user: {
            email: string;
            nombre: string;
            newPassword: string;
        };
    }>;
    resetPassword(data: ChangePasswordDto, userId: number): Promise<{
        user: {
            email: string;
            nombre: string;
            newPassword: string;
        };
    }>;
    private generateRandomPassword;
}
