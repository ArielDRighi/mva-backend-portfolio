"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../roles/enums/role.enum");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll(page = 1, limit = 10, search) {
        const query = this.usersRepository.createQueryBuilder('user');
        if (search) {
            const searchTerm = `%${search.toLowerCase()}%`;
            query.where(`LOWER(user.nombre) LIKE :searchTerm
        OR LOWER(user.email) LIKE :searchTerm
        OR LOWER(user.estado) LIKE :searchTerm`, { searchTerm });
        }
        query.skip((page - 1) * limit).take(limit);
        const [users, total] = await Promise.all([
            query.getMany(),
            query.getCount(),
        ]);
        return {
            data: users,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }
    async findByUsername(nombre) {
        return this.usersRepository.findOne({
            where: { nombre },
            select: [
                'id',
                'nombre',
                'email',
                'password',
                'estado',
                'roles',
                'empleadoId',
            ],
        });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async create(createUserDto) {
        const existingUsername = await this.findByUsername(createUserDto.nombre);
        if (existingUsername) {
            throw new common_1.ConflictException('El nombre de usuario ya está en uso');
        }
        const existingEmail = await this.findByEmail(createUserDto.email);
        if (existingEmail) {
            throw new common_1.ConflictException('El correo electrónico ya está en uso');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);
        const newUser = this.usersRepository.create({
            empleadoId: createUserDto.empleadoId,
            nombre: createUserDto.nombre,
            email: createUserDto.email,
            password: passwordHash,
            estado: 'ACTIVO',
            roles: createUserDto.roles || [role_enum_1.Role.OPERARIO],
        });
        return this.usersRepository.save(newUser);
    }
    async update(id, updateUserDto) {
        const user = await this.findById(id);
        if (updateUserDto.nombre && updateUserDto.nombre !== user.nombre) {
            const existingUsername = await this.findByUsername(updateUserDto.nombre);
            if (existingUsername) {
                throw new common_1.ConflictException('El nombre de usuario ya está en uso');
            }
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingEmail = await this.findByEmail(updateUserDto.email);
            if (existingEmail) {
                throw new common_1.ConflictException('El correo electrónico ya está en uso');
            }
        }
        if (updateUserDto.password) {
            const saltRounds = 10;
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }
        await this.usersRepository.update(id, updateUserDto);
        return this.findById(id);
    }
    async remove(id) {
        const user = await this.findById(id);
        await this.usersRepository.remove(user);
    }
    async changeStatus(id, estado) {
        const user = await this.findById(id);
        user.estado = estado;
        return this.usersRepository.save(user);
    }
    async updatePassword(id, passwordHash) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        try {
            await this.usersRepository.update(id, { password: passwordHash });
            const updatedUser = await this.findById(id);
            return updatedUser;
        }
        catch {
            throw new common_1.ConflictException('Error al actualizar la contraseña');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map