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
var EmployeesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const license_entity_1 = require("./entities/license.entity");
const emergencyContacts_entity_1 = require("./entities/emergencyContacts.entity");
const examenPreocupacional_entity_1 = require("./entities/examenPreocupacional.entity");
const typeorm_3 = require("typeorm");
const service_entity_1 = require("../services/entities/service.entity");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const role_enum_1 = require("../roles/enums/role.enum");
let EmployeesService = EmployeesService_1 = class EmployeesService {
    constructor(employeeRepository, dataSource, licenciaRepository, emergencyContactRepository, examenPreocupacionalRepository, usersService) {
        this.employeeRepository = employeeRepository;
        this.dataSource = dataSource;
        this.licenciaRepository = licenciaRepository;
        this.emergencyContactRepository = emergencyContactRepository;
        this.examenPreocupacionalRepository = examenPreocupacionalRepository;
        this.usersService = usersService;
        this.logger = new common_1.Logger(EmployeesService_1.name);
    }
    async create(createEmployeeDto) {
        this.logger.log(`Creando empleado: ${createEmployeeDto.nombre} ${createEmployeeDto.apellido}`);
        const existingDocumento = await this.employeeRepository.findOne({
            where: { documento: createEmployeeDto.documento },
        });
        if (existingDocumento) {
            throw new common_1.ConflictException(`Ya existe un empleado con el documento ${createEmployeeDto.documento}`);
        }
        const existingEmail = await this.employeeRepository.findOne({
            where: { email: createEmployeeDto.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException(`Ya existe un empleado con el email ${createEmployeeDto.email}`);
        }
        const newEmployee = this.employeeRepository.create(createEmployeeDto);
        const savedEmployee = await this.employeeRepository.save(newEmployee);
        try {
            await this.usersService.create({
                nombre: `${createEmployeeDto.nombre} ${createEmployeeDto.apellido}`,
                email: createEmployeeDto.email,
                password: createEmployeeDto.documento,
                roles: [role_enum_1.Role.OPERARIO],
                empleadoId: savedEmployee.id,
            });
        }
        catch (error) {
            this.logger.error(`Error al crear usuario para empleado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
        return savedEmployee;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, search } = paginationDto;
        this.logger.log(`Recuperando empleados - Página: ${page}, Límite: ${limit}, Búsqueda: ${search}`);
        const query = this.employeeRepository.createQueryBuilder('empleado');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            query.where(`LOWER(empleado.nombre) LIKE :term
  OR LOWER(empleado.apellido) LIKE :term
  OR LOWER(empleado.documento) LIKE :term
  OR LOWER(empleado.cargo) LIKE :term
  OR LOWER(empleado.estado) LIKE :term`, { term: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                query.andWhere(`LOWER(UNACCENT(empleado.nombre)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.apellido)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.documento)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.cargo)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.estado)) LIKE :term${i}`, { [`term${i}`]: `%${searchTerms[i]}%` });
            }
        }
        const [empleados, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: empleados,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        this.logger.log(`Buscando empleado con id: ${id}`);
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: [
                'licencia',
                'emergencyContacts',
                'examenesPreocupacionales',
                'talleRopa',
            ],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${id} no encontrado`);
        }
        return employee;
    }
    async findByDocumento(documento) {
        this.logger.log(`Buscando empleado con documento: ${documento}`);
        const employee = await this.employeeRepository.findOne({
            where: { documento },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con documento ${documento} no encontrado`);
        }
        return employee;
    }
    async update(id, updateEmployeeDto) {
        this.logger.log(`Actualizando empleado con id: ${id}`);
        const employee = await this.findOne(id);
        if (updateEmployeeDto.documento &&
            updateEmployeeDto.documento !== employee.documento) {
            const existingDocumento = await this.employeeRepository.findOne({
                where: { documento: updateEmployeeDto.documento },
            });
            if (existingDocumento) {
                throw new common_1.ConflictException(`Ya existe un empleado con el documento ${updateEmployeeDto.documento}`);
            }
        }
        if (updateEmployeeDto.email && updateEmployeeDto.email !== employee.email) {
            const existingEmail = await this.employeeRepository.findOne({
                where: { email: updateEmployeeDto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException(`Ya existe un empleado con el email ${updateEmployeeDto.email}`);
            }
        }
        if (updateEmployeeDto.password) {
            const hashedPassword = await bcrypt.hash(updateEmployeeDto.password, 10);
            updateEmployeeDto.password = hashedPassword;
        }
        Object.assign(employee, updateEmployeeDto);
        return this.employeeRepository.save(employee);
    }
    async remove(id) {
        this.logger.log(`Eliminando empleado con id: ${id}`);
        const employee = await this.findOne(id);
        const employeeWithAssignments = await this.employeeRepository
            .createQueryBuilder('empleado')
            .leftJoinAndSelect('asignacion_recursos', 'asignacion', 'asignacion.empleado_id = empleado.id')
            .leftJoinAndSelect('servicios', 'servicio', 'asignacion.servicio_id = servicio.servicio_id')
            .where('empleado.id = :id', { id })
            .andWhere('asignacion.empleado_id IS NOT NULL')
            .getOne();
        if (employeeWithAssignments) {
            throw new common_1.BadRequestException(`El empleado no puede ser eliminado ya que se encuentra asignado a uno o más servicios.`);
        }
        const nombre = `${employee.nombre} ${employee.apellido}`;
        await this.employeeRepository.remove(employee);
        return { message: `Empleado ${nombre} eliminado correctamente` };
    }
    async changeStatus(id, estado) {
        this.logger.log(`Cambiando estado del empleado ${id} a ${estado}`);
        const employee = await this.findOne(id);
        employee.estado = estado;
        return this.employeeRepository.save(employee);
    }
    async findByCargo(cargo) {
        this.logger.log(`Buscando empleados con cargo: ${cargo}`);
        return this.employeeRepository.find({
            where: { cargo },
        });
    }
    async createLicencia(createLicenseDto, empleadoId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['licencia'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${empleadoId} no encontrado`);
        }
        if (!employee.licencia) {
            const licencia = this.licenciaRepository.create({
                categoria: createLicenseDto.categoria,
                fecha_expedicion: createLicenseDto.fecha_expedicion,
                fecha_vencimiento: createLicenseDto.fecha_vencimiento,
                empleado: employee,
            });
            await this.licenciaRepository.save(licencia);
            const licenciaCreada = await this.licenciaRepository.findOne({
                where: { licencia_id: licencia.licencia_id },
                relations: ['empleado'],
            });
            if (!licenciaCreada) {
                throw new common_1.NotFoundException(`Licencia con id ${licencia.licencia_id} no encontrada`);
            }
            return licenciaCreada;
        }
        throw new common_1.ConflictException(`El empleado con id ${empleadoId} ya tiene una licencia asociada`);
    }
    async findLicenciasByEmpleadoId(empleadoId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['licencia'],
        });
        if (!employee.licencia) {
            throw new common_1.NotFoundException(`Empleado con id ${empleadoId} no tiene licencia asociada`);
        }
        return employee.licencia;
    }
    async createEmergencyContact(createEmergencyContactDto, empleadoId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['emergencyContacts'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${empleadoId} no encontrado`);
        }
        const contactoEmergencia = this.emergencyContactRepository.create({
            nombre: createEmergencyContactDto.nombre,
            apellido: createEmergencyContactDto.apellido,
            parentesco: createEmergencyContactDto.parentesco,
            telefono: createEmergencyContactDto.telefono,
            empleado: employee,
        });
        await this.emergencyContactRepository.save(contactoEmergencia);
        const contact = await this.emergencyContactRepository.findOne({
            where: { id: contactoEmergencia.id },
            relations: ['empleado'],
        });
        if (!contact) {
            throw new common_1.NotFoundException(`Contacto de emergencia con id ${contactoEmergencia.id} no encontrado`);
        }
        return contact;
    }
    async findLicencias(days = 0, page = 1, limit = 10, search) {
        this.logger.log(`Buscando licencias (página ${page}, límite ${limit}, días: ${days}, búsqueda: ${search})`);
        try {
            const queryBuilder = this.licenciaRepository
                .createQueryBuilder('licencia')
                .leftJoinAndSelect('licencia.empleado', 'empleado')
                .orderBy('licencia.fecha_vencimiento', 'ASC');
            if (days > 0) {
                const today = new Date();
                const futureDateLimit = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
                queryBuilder.where('licencia.fecha_vencimiento BETWEEN :today AND :futureDateLimit', {
                    today: today.toISOString().split('T')[0],
                    futureDateLimit: futureDateLimit.toISOString().split('T')[0],
                });
            }
            if (search) {
                queryBuilder.andWhere(`(
          unaccent(lower(empleado.nombre)) LIKE unaccent(lower(:search)) OR
          unaccent(lower(empleado.apellido)) LIKE unaccent(lower(:search)) OR
          unaccent(lower(empleado.cargo)) LIKE unaccent(lower(:search))
        )`, { search: `%${search}%` });
            }
            const totalItems = await queryBuilder.getCount();
            const licencias = await queryBuilder
                .skip((page - 1) * limit)
                .take(limit)
                .getMany();
            if (licencias.length === 0) {
                this.logger.warn('No se encontraron licencias con los criterios especificados');
            }
            return {
                data: licencias,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error al buscar licencias: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            throw new common_1.NotFoundException('No se pudieron encontrar licencias');
        }
    }
    async findEmergencyContactsByEmpleadoId(empleadoId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['emergencyContacts'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${empleadoId} no encontrado`);
        }
        return employee.emergencyContacts;
    }
    async updateEmergencyContact(contactoId, updateEmergencyContactDto) {
        const contactoEmergencia = await this.emergencyContactRepository.findOne({
            where: { id: contactoId },
        });
        if (!contactoEmergencia) {
            throw new common_1.NotFoundException(`Contacto de emergencia con id ${contactoId} no encontrado`);
        }
        await this.emergencyContactRepository.update(contactoId, updateEmergencyContactDto);
        const updatedContact = await this.emergencyContactRepository.findOne({
            where: { id: contactoId },
        });
        if (!updatedContact) {
            throw new common_1.NotFoundException(`Contacto de emergencia con id ${contactoId} no encontrado`);
        }
        return updatedContact;
    }
    async removeEmergencyContact(contactoId) {
        {
            const contactoEmergencia = await this.emergencyContactRepository.findOne({
                where: { id: contactoId },
            });
            if (!contactoEmergencia) {
                throw new common_1.NotFoundException(`Contacto de emergencia con id ${contactoId} no encontrado`);
            }
            await this.emergencyContactRepository.remove(contactoEmergencia);
            return { message: `Contacto de emergencia eliminado correctamente` };
        }
    }
    async updateLicencia(empleadoId, updateLicenseDto) {
        const user = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['licencia'],
        });
        if (!user?.licencia) {
            throw new common_1.NotFoundException(`Licencia con id ${user?.licencia.licencia_id} no encontrada`);
        }
        await this.licenciaRepository.update(user.licencia.licencia_id, updateLicenseDto);
        const updatedLicense = await this.licenciaRepository.findOne({
            where: { licencia_id: user.licencia.licencia_id },
        });
        if (!updatedLicense) {
            throw new common_1.NotFoundException(`Licencia con id ${user.licencia.licencia_id} no encontrada`);
        }
        return updatedLicense;
    }
    async removeLicencia(licenciaId) {
        const licencia = await this.licenciaRepository.findOne({
            where: { licencia_id: licenciaId },
        });
        if (!licencia) {
            throw new common_1.NotFoundException(`Licencia con id ${licenciaId} no encontrada`);
        }
        await this.licenciaRepository.remove(licencia);
        return { message: `Licencia eliminada correctamente` };
    }
    async findLicensesToExpire(days = 30, page = 1, limit = 10) {
        const today = new Date();
        const futureDateLimit = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        this.logger.log(`Buscando licencias que vencen en los próximos ${days} días (página ${page}, límite ${limit})`);
        try {
            const queryBuilder = this.licenciaRepository
                .createQueryBuilder('licencia')
                .leftJoinAndSelect('licencia.empleado', 'empleado')
                .where('licencia.fecha_vencimiento BETWEEN :today AND :futureDateLimit', {
                today: today.toISOString().split('T')[0],
                futureDateLimit: futureDateLimit.toISOString().split('T')[0],
            })
                .orderBy('licencia.fecha_vencimiento', 'ASC');
            const totalItems = await queryBuilder.getCount();
            const licensesToExpire = await queryBuilder
                .skip((page - 1) * limit)
                .take(limit)
                .getMany();
            return {
                data: licensesToExpire,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
            };
        }
        catch (error) {
            this.logger.error(`Error al buscar licencias por vencer: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            throw new common_1.NotFoundException('No se pudieron encontrar licencias por vencer');
        }
    }
    async findExamenesByEmpleadoId(empleadoId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: empleadoId },
            relations: ['examenesPreocupacionales'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${empleadoId} no encontrado`);
        }
        if (!employee.examenesPreocupacionales) {
            throw new common_1.NotFoundException(`El empleado con id ${empleadoId} no tiene exámenes preocupacionales`);
        }
        return employee.examenesPreocupacionales;
    }
    async findProximosServiciosPorEmpleadoId(empleadoId) {
        this.logger.log(`Obteniendo servicios activos asignados al empleado ${empleadoId}`);
        return this.dataSource
            .getRepository(service_entity_1.Service)
            .createQueryBuilder('service')
            .innerJoin('service.asignaciones', 'asignacion')
            .leftJoinAndSelect('service.cliente', 'cliente')
            .leftJoinAndSelect('service.asignaciones', 'asignaciones')
            .leftJoinAndSelect('asignaciones.empleado', 'empleado')
            .leftJoinAndSelect('asignaciones.vehiculo', 'vehiculo')
            .leftJoinAndSelect('asignaciones.bano', 'bano')
            .where('asignacion.empleadoId = :empleadoId', { empleadoId })
            .andWhere('service.estado IN (:...estados)', {
            estados: [resource_states_enum_1.ServiceState.PROGRAMADO, resource_states_enum_1.ServiceState.EN_PROGRESO]
        })
            .orderBy('service.fechaProgramada', 'ASC')
            .getMany();
    }
    async createExamenPreocupacional(createExamenPreocupacionalDto) {
        const employee = await this.employeeRepository.findOne({
            where: { id: createExamenPreocupacionalDto.empleado_id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con id ${createExamenPreocupacionalDto.empleado_id} no encontrado`);
        }
        const examenPreocupacional = this.examenPreocupacionalRepository.create({
            fecha_examen: createExamenPreocupacionalDto.fecha_examen,
            resultado: createExamenPreocupacionalDto.resultado,
            observaciones: createExamenPreocupacionalDto.observaciones,
            realizado_por: createExamenPreocupacionalDto.realizado_por,
            empleado: employee,
        });
        await this.examenPreocupacionalRepository.save(examenPreocupacional);
        const examenCreado = await this.examenPreocupacionalRepository.findOne({
            where: {
                examen_preocupacional_id: examenPreocupacional.examen_preocupacional_id,
            },
            relations: ['empleado'],
        });
        if (!examenCreado) {
            throw new common_1.NotFoundException(`Examen preocupacional con id ${examenPreocupacional.examen_preocupacional_id} no encontrado`);
        }
        return examenCreado;
    }
    async removeExamenPreocupacional(examenId) {
        const examen = await this.examenPreocupacionalRepository.findOne({
            where: { examen_preocupacional_id: examenId },
        });
        if (!examen) {
            throw new common_1.NotFoundException(`Examen preocupacional con id ${examenId} no encontrado`);
        }
        await this.examenPreocupacionalRepository.remove(examen);
        return { message: `Examen preocupacional eliminado correctamente` };
    }
    async updateExamenPreocupacional(examenId, updateExamenPreocupacionalDto) {
        const examen = await this.examenPreocupacionalRepository.findOne({
            where: { examen_preocupacional_id: examenId },
        });
        if (!examen) {
            throw new common_1.NotFoundException(`Examen preocupacional con id ${examenId} no encontrado`);
        }
        Object.assign(examen, updateExamenPreocupacionalDto);
        await this.examenPreocupacionalRepository.save(examen);
        const updatedExamen = await this.examenPreocupacionalRepository.findOne({
            where: { examen_preocupacional_id: examenId },
        });
        if (!updatedExamen) {
            throw new common_1.NotFoundException(`Examen preocupacional con id ${examenId} no encontrado`);
        }
        return updatedExamen;
    }
    async getTotalEmployees() {
        const total = await this.employeeRepository.count();
        const totalDisponibles = await this.employeeRepository.count({
            where: { estado: 'DISPONIBLE' },
        });
        const totalInactivos = await this.employeeRepository.count({
            where: { estado: 'INACTIVO' },
        });
        return {
            total,
            totalDisponibles,
            totalInactivos,
        };
    }
    async findByEmail(email) {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con email ${email} no encontrado`);
        }
        return employee;
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = EmployeesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Empleado)),
    __param(2, (0, typeorm_1.InjectRepository)(license_entity_1.Licencias)),
    __param(3, (0, typeorm_1.InjectRepository)(emergencyContacts_entity_1.ContactosEmergencia)),
    __param(4, (0, typeorm_1.InjectRepository)(examenPreocupacional_entity_1.ExamenPreocupacional)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_3.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map