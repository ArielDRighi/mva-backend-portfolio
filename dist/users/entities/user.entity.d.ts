import { Role } from '../../roles/enums/role.enum';
export declare class User {
    id: number;
    empleadoId: number;
    nombre: string;
    email: string;
    password: string;
    estado: string;
    roles: Role[];
    comparePassword(password: string): Promise<boolean>;
}
