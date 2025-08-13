import { Role } from '../../roles/enums/role.enum';
export declare class CreateUserDto {
    empleadoId?: number;
    nombre: string;
    email: string;
    password: string;
    roles?: Role[];
}
