import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(page?: number, limit?: number, search?: string): Promise<any>;
    findById(id: number): Promise<User>;
    findByUsername(nombre: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    changeStatus(id: number, estado: 'ACTIVO' | 'INACTIVO'): Promise<User>;
    updatePassword(id: number, passwordHash: string): Promise<User>;
}
