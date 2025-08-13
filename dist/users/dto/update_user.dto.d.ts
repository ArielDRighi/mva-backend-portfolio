import { Role } from '../../roles/enums/role.enum';
export declare class UpdateUserDto {
    empleadoId?: number;
    nombre?: string;
    email?: string;
    password?: string;
    estado?: string;
    roles?: Role[];
}
