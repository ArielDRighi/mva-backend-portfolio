import { AuthService } from './auth.service';
import { ChangePasswordDto, ForgotPasswordDto, LoginDto } from './dto/login.dto';
import { Role } from '../roles/enums/role.enum';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            empleadoId: number;
            estado: string;
            roles: Role[];
        };
    }>;
    forgotPassword(email: ForgotPasswordDto): Promise<{
        user: {
            email: string;
            nombre: string;
            newPassword: string;
        };
    }>;
    resetPassword(data: ChangePasswordDto, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<{
        user: {
            email: string;
            nombre: string;
            newPassword: string;
        };
    }>;
}
