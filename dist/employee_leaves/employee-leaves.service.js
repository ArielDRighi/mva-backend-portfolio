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
var EmployeeLeavesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLeavesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_leave_entity_1 = require("./entities/employee-leave.entity");
const employees_service_1 = require("../employees/employees.service");
const date_fns_1 = require("date-fns");
let EmployeeLeavesService = EmployeeLeavesService_1 = class EmployeeLeavesService {
    constructor(leaveRepository, employeesService) {
        this.leaveRepository = leaveRepository;
        this.employeesService = employeesService;
        this.logger = new common_1.Logger(EmployeeLeavesService_1.name);
    }
    async create(createLeaveDto) {
        this.logger.log(`Creando licencia para empleado: ${createLeaveDto && createLeaveDto.employeeId ? Number(createLeaveDto.employeeId) : 'unknown'}`);
        const employeeId = Number(createLeaveDto.employeeId);
        const employee = await this.employeesService.findOne(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con ID ${employeeId} no encontrado`);
        }
        const fechaInicio = createLeaveDto.fechaInicio;
        const fechaFin = createLeaveDto.fechaFin;
        if (fechaFin < fechaInicio) {
            throw new common_1.BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
        }
        const existingLeave = await this.leaveRepository.findOne({
            where: [
                {
                    employeeId: employeeId,
                    fechaInicio: (0, typeorm_2.LessThanOrEqual)(fechaFin),
                    fechaFin: (0, typeorm_2.MoreThanOrEqual)(fechaInicio),
                },
            ],
        });
        if (existingLeave) {
            throw new common_1.BadRequestException(`El empleado ya tiene una licencia programada que se solapa con las fechas solicitadas`);
        }
        const leave = this.leaveRepository.create({
            ...createLeaveDto,
            employeeId,
        });
        return this.leaveRepository.save(leave);
    }
    async findAll(page = 1, limit = 10, search, tipoLicencia) {
        const queryBuilder = this.leaveRepository
            .createQueryBuilder('leave')
            .leftJoinAndSelect('leave.employee', 'employee')
            .orderBy('leave.fechaInicio', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        if (search) {
            queryBuilder.andWhere(`(LOWER(employee.nombre) LIKE LOWER(:search) OR
      LOWER(employee.apellido) LIKE LOWER(:search) OR
      LOWER(employee.documento) LIKE LOWER(:search) OR
      LOWER(employee.cargo) LIKE LOWER(:search) OR
      LOWER(CAST(leave.tipoLicencia AS TEXT)) LIKE LOWER(:search) OR
      LOWER(COALESCE(leave.comentarioRechazo, '')) LIKE LOWER(:search))`, { search: `%${search}%` });
        }
        if (tipoLicencia) {
            queryBuilder.andWhere('leave.tipoLicencia = :tipoLicencia', {
                tipoLicencia,
            });
        }
        const [data, totalItems] = await queryBuilder.getManyAndCount();
        return {
            data,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
        };
    }
    async findOne(id) {
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Licencia con ID ${id} no encontrada`);
        }
        return leave;
    }
    async findByEmployee(employeeId) {
        await this.employeesService.findOne(employeeId);
        return this.leaveRepository.find({
            where: { employeeId },
            relations: ['employee'],
            order: { fechaInicio: 'ASC' },
        });
    }
    async update(id, updateLeaveDto) {
        const leave = await this.findOne(id);
        if (updateLeaveDto.employeeId &&
            updateLeaveDto.employeeId !== leave.employeeId) {
            await this.employeesService.findOne(updateLeaveDto.employeeId);
        }
        if ((updateLeaveDto.fechaInicio &&
            leave.fechaInicio !== updateLeaveDto.fechaInicio) ||
            (updateLeaveDto.fechaFin && leave.fechaFin !== updateLeaveDto.fechaFin)) {
            const employee = await this.employeesService.findOne(updateLeaveDto.employeeId || leave.employeeId);
            if (!employee) {
                throw new common_1.NotFoundException(`Empleado con ID ${updateLeaveDto.employeeId} no encontrado`);
            }
            const fechaInicio = updateLeaveDto.fechaInicio || leave.fechaInicio;
            const fechaFin = updateLeaveDto.fechaFin || leave.fechaFin;
            const diasUsados = fechaFin.getTime() - fechaInicio.getTime();
            const diasUsadosEnLicencia = Math.ceil(diasUsados / (1000 * 3600 * 24));
            const diasDisponibles = employee.diasVacacionesRestantes;
            if (diasUsadosEnLicencia > diasDisponibles) {
                throw new common_1.BadRequestException(`El empleado no tiene suficientes días de licencia disponibles`);
            }
            const diasRestantes = diasDisponibles - diasUsadosEnLicencia;
            console.log('Dias restantes: ', diasRestantes);
            console.log('Dias usados en licencia: ', diasUsadosEnLicencia);
            await this.employeesService.update(employee.id, {
                diasVacacionesRestantes: diasRestantes,
                diasVacacionesUsados: employee.diasVacacionesUsados + diasUsadosEnLicencia,
            });
            if (fechaFin < fechaInicio) {
                throw new common_1.BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            const existingLeave = await this.leaveRepository.findOne({
                where: [
                    {
                        id: (0, typeorm_2.Not)(id),
                        employeeId: updateLeaveDto.employeeId || leave.employeeId,
                        fechaInicio: (0, typeorm_2.LessThanOrEqual)(fechaFin),
                        fechaFin: (0, typeorm_2.MoreThanOrEqual)(fechaInicio),
                    },
                ],
            });
            if (existingLeave) {
                throw new common_1.BadRequestException('Las nuevas fechas se solapan con otra licencia existente');
            }
        }
        Object.assign(leave, updateLeaveDto);
        return this.leaveRepository.save(leave);
    }
    async reject(id, comentario) {
        this.logger.log(`Rechazando licencia con ID: ${id}`);
        const leave = await this.findOne(id);
        if (leave.aprobado === true) {
            throw new common_1.BadRequestException(`No se puede rechazar una licencia que ya fue aprobada`);
        }
        leave.comentarioRechazo =
            comentario ?? 'Solicitud rechazada sin comentarios';
        await this.leaveRepository.save(leave);
        return leave;
    }
    async remove(id) {
        const leave = await this.findOne(id);
        await this.leaveRepository.remove(leave);
        return { message: `Licencia #${id} eliminada correctamente` };
    }
    async isEmployeeAvailable(employeeId, fecha) {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);
        const leaveCount = await this.leaveRepository.count({
            where: {
                employeeId,
                fechaInicio: (0, typeorm_2.LessThanOrEqual)(endOfDay),
                fechaFin: (0, typeorm_2.MoreThanOrEqual)(startOfDay),
                aprobado: true,
            },
        });
        return leaveCount === 0;
    }
    async getActiveLeaves(fecha) {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);
        return this.leaveRepository.find({
            where: {
                fechaInicio: (0, typeorm_2.LessThanOrEqual)(endOfDay),
                fechaFin: (0, typeorm_2.MoreThanOrEqual)(startOfDay),
                aprobado: true,
            },
            relations: ['employee'],
        });
    }
    async approve(id) {
        this.logger.log(`Aprobando licencia con ID: ${id}`);
        const leave = await this.findOne(id);
        if (leave.aprobado === true) {
            throw new common_1.BadRequestException(`La licencia con ID ${id} ya está aprobada`);
        }
        const fechaInicio = leave.fechaInicio instanceof Date
            ? leave.fechaInicio
            : new Date(leave.fechaInicio);
        const fechaFin = leave.fechaFin instanceof Date
            ? leave.fechaFin
            : new Date(leave.fechaFin);
        const employee = await this.employeesService.findOne(leave.employeeId);
        if (!employee) {
            throw new common_1.NotFoundException(`Empleado con ID ${leave.employeeId} no encontrado`);
        }
        const diasUsadosEnLicencia = (0, date_fns_1.differenceInCalendarDays)(fechaFin, fechaInicio) + 1;
        const diasDisponibles = employee.diasVacacionesRestantes;
        this.logger.log(`Días usados en licencia: ${diasUsadosEnLicencia}`);
        this.logger.log(`Días disponibles: ${diasDisponibles}`);
        if (diasUsadosEnLicencia > diasDisponibles) {
            throw new common_1.BadRequestException(`El empleado no tiene suficientes días de licencia disponibles`);
        }
        const diasRestantes = diasDisponibles - diasUsadosEnLicencia;
        this.logger.log(`Actualizando empleado ID ${employee.id}, días restantes: ${diasRestantes}`);
        await this.employeesService.update(employee.id, {
            diasVacacionesRestantes: diasRestantes,
            diasVacacionesUsados: employee.diasVacacionesUsados + diasUsadosEnLicencia,
        });
        leave.aprobado = true;
        await this.leaveRepository.save(leave);
        return await this.findOne(id);
    }
};
exports.EmployeeLeavesService = EmployeeLeavesService;
exports.EmployeeLeavesService = EmployeeLeavesService = EmployeeLeavesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_leave_entity_1.EmployeeLeave)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        employees_service_1.EmployeesService])
], EmployeeLeavesService);
//# sourceMappingURL=employee-leaves.service.js.map