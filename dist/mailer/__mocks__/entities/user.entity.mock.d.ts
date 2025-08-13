import { Role } from '../../../roles/enums/role.enum';
export declare class UserEntityMock {
    id: number;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
