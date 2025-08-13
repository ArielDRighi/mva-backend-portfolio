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
var ServicesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clients_service_1 = require("../clients/clients.service");
const employees_service_1 = require("../employees/employees.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const chemical_toilets_service_1 = require("../chemical_toilets/chemical_toilets.service");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const employee_entity_1 = require("../employees/entities/employee.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const chemical_toilet_entity_1 = require("../chemical_toilets/entities/chemical_toilet.entity");
const vehicle_maintenance_service_1 = require("../vehicle_maintenance/vehicle_maintenance.service");
const toilet_maintenance_service_1 = require("../toilet_maintenance/toilet_maintenance.service");
const employee_leaves_service_1 = require("../employee_leaves/employee-leaves.service");
const contractual_conditions_entity_1 = require("../contractual_conditions/entities/contractual_conditions.entity");
const futureCleanings_service_1 = require("../future_cleanings/futureCleanings.service");
const service_entity_1 = require("./entities/service.entity");
const resource_assignment_entity_1 = require("./entities/resource-assignment.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const mailer_service_1 = require("../mailer/mailer.service");
let ServicesService = ServicesService_1 = class ServicesService {
    constructor(serviceRepository, assignmentRepository, vehiclesRepository, empleadosRepository, toiletsRepository, clientsService, employeesService, vehiclesService, toiletsService, vehicleMaintenanceService, toiletMaintenanceService, condicionesContractualesRepository, employeeLeavesService, dataSource, futureCleaningsService, clientesRepository, mailerService) {
        this.serviceRepository = serviceRepository;
        this.assignmentRepository = assignmentRepository;
        this.vehiclesRepository = vehiclesRepository;
        this.empleadosRepository = empleadosRepository;
        this.toiletsRepository = toiletsRepository;
        this.clientsService = clientsService;
        this.employeesService = employeesService;
        this.vehiclesService = vehiclesService;
        this.toiletsService = toiletsService;
        this.vehicleMaintenanceService = vehicleMaintenanceService;
        this.toiletMaintenanceService = toiletMaintenanceService;
        this.condicionesContractualesRepository = condicionesContractualesRepository;
        this.employeeLeavesService = employeeLeavesService;
        this.dataSource = dataSource;
        this.futureCleaningsService = futureCleaningsService;
        this.clientesRepository = clientesRepository;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(ServicesService_1.name);
    }
    async create(dto) {
        switch (dto.tipoServicio) {
            case resource_states_enum_1.ServiceType.INSTALACION:
                return this.createInstalacion(dto);
            case resource_states_enum_1.ServiceType.CAPACITACION:
                return this.createCapacitacion(dto);
            case resource_states_enum_1.ServiceType.LIMPIEZA:
                return this.createLimpieza(dto);
            default:
                return this.createGenerico(dto);
        }
    }
    async createInstalacion(dto) {
        const service = await this.createBaseService(dto);
        if (service.condicionContractualId &&
            service.fechaInicio &&
            service.fechaFin) {
            const condicion = await this.condicionesContractualesRepository.findOne({
                where: { condicionContractualId: service.condicionContractualId },
                relations: ['cliente'],
            });
            if (condicion?.periodicidad) {
                const dias = this.toiletMaintenanceService.calculateMaintenanceDays(service.fechaInicio, service.fechaFin, condicion.periodicidad);
                for (let i = 0; i < dias.length; i++) {
                    try {
                        const createFutureCleaningDto = {
                            clientId: condicion.cliente.clienteId,
                            fecha_de_limpieza: dias[i],
                            servicioId: service.id,
                        };
                        await this.futureCleaningsService.createFutureCleaning(createFutureCleaningDto);
                        this.logger.log(`Recordatorio de limpieza #${i + 1} programado para: ${dias[i].toISOString()}`);
                    }
                    catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                        this.logger.error(`Error al crear recordatorio de limpieza #${i + 1}: ${errorMessage}`);
                    }
                }
            }
        }
        return this.findOne(service.id);
    }
    async createCapacitacion(dto) {
        dto.cantidadVehiculos = 0;
        const service = await this.createBaseService(dto);
        await this.scheduleEmployeeStatusForCapacitacion(service);
        return this.findOne(service.id);
    }
    async createLimpieza(dto) {
        const service = await this.createBaseService(dto);
        if ((!dto.banosInstalados || dto.banosInstalados.length === 0) &&
            dto.clienteId) {
            const ultimoServicioInstalacion = await this.serviceRepository.findOne({
                where: {
                    cliente: { clienteId: dto.clienteId },
                    tipoServicio: resource_states_enum_1.ServiceType.INSTALACION,
                },
                order: { fechaProgramada: 'DESC' },
            });
            if (ultimoServicioInstalacion?.banosInstalados?.length) {
                service.banosInstalados = ultimoServicioInstalacion.banosInstalados;
                await this.serviceRepository.save(service);
                this.logger.log(`Baños asignados automáticamente al servicio de limpieza ${service.id}: ${service.banosInstalados.join(', ')}`);
            }
            else {
                this.logger.warn(`No se encontraron baños instalados para cliente ${dto.clienteId}`);
                service.banosInstalados = [];
            }
        }
        return this.findOne(service.id);
    }
    async createGenerico(dto) {
        return this.createBaseService(dto);
    }
    async createBaseService(dto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this.logger.log(`[Service] Creando servicio con DTO: ${JSON.stringify(dto)}`);
            const newService = new service_entity_1.Service();
            let cliente = null;
            if (dto.clienteId) {
                this.logger.log(`[Service] Buscando cliente con ID: ${dto.clienteId}`);
                cliente = await this.clientesRepository.findOne({
                    where: { clienteId: dto.clienteId },
                });
                if (!cliente)
                    throw new Error(`Cliente ID ${dto.clienteId} no encontrado`);
            }
            if (dto.condicionContractualId) {
                this.logger.log(`[Service] Buscando contrato con ID: ${dto.condicionContractualId}`);
                const contrato = await this.condicionesContractualesRepository.findOne({
                    where: { condicionContractualId: dto.condicionContractualId },
                    relations: ['cliente'],
                });
                if (contrato) {
                    newService.condicionContractualId = contrato.condicionContractualId;
                    if (!cliente)
                        cliente = contrato.cliente;
                    if (contrato.fecha_inicio && contrato.fecha_fin) {
                        const contratoFechaInicio = new Date(contrato.fecha_inicio);
                        const contratoFechaFin = new Date(contrato.fecha_fin);
                        if (contratoFechaInicio >= contratoFechaFin) {
                            throw new common_1.BadRequestException('El contrato asociado tiene fechas inválidas: la fecha de inicio debe ser anterior a la fecha de fin');
                        }
                        const fechaInicio = new Date(contrato.fecha_inicio);
                        const fechaFin = new Date(contrato.fecha_fin);
                        fechaInicio.setDate(fechaInicio.getDate() + 1);
                        fechaFin.setDate(fechaFin.getDate() + 1);
                        newService.fechaInicio = fechaInicio;
                        newService.fechaFin = fechaFin;
                        newService.fechaFinAsignacion = fechaFin;
                    }
                    if (!dto.tipoServicio && contrato.tipo_servicio) {
                        newService.tipoServicio = contrato.tipo_servicio;
                    }
                    if (!dto.cantidadBanos && contrato.cantidad_banos) {
                        newService.cantidadBanos = contrato.cantidad_banos;
                    }
                }
            }
            if (!cliente && dto.tipoServicio !== resource_states_enum_1.ServiceType.CAPACITACION) {
                throw new Error('No se pudo determinar el cliente');
            }
            if (cliente) {
                newService.cliente = cliente;
            }
            if (dto.tipoServicio &&
                [resource_states_enum_1.ServiceType.CAPACITACION, resource_states_enum_1.ServiceType.LIMPIEZA].includes(dto.tipoServicio)) {
                dto.cantidadBanos = 0;
            }
            const banosInstaladosFromManual = dto.banosInstalados ||
                (dto.asignacionesManual?.length
                    ? dto.asignacionesManual.flatMap((a) => a.banosIds || [])
                    : []);
            Object.assign(newService, {
                fechaProgramada: dto.fechaProgramada,
                tipoServicio: newService.tipoServicio || dto.tipoServicio,
                estado: dto.estado || resource_states_enum_1.ServiceState.PROGRAMADO,
                cantidadBanos: newService.cantidadBanos || dto.cantidadBanos,
                cantidadEmpleados: this.getDefaultCantidadEmpleados(newService.tipoServicio || dto.tipoServicio),
                cantidadVehiculos: dto.cantidadVehiculos,
                ubicacion: dto.ubicacion,
                notas: dto.notas,
                banosInstalados: banosInstaladosFromManual,
                asignacionAutomatica: false,
            });
            this.validateServiceTypeSpecificRequirements(dto);
            if (dto.forzar !== undefined) {
                Object.assign(newService, { forzar: dto.forzar });
            }
            await this.verifyResourcesAvailability(newService);
            const saved = await queryRunner.manager.save(newService);
            if (dto.asignacionesManual?.length) {
                const empleadosAsignados = dto.asignacionesManual.map((a) => a.empleadoId);
                const empleadosUnicos = new Set(empleadosAsignados);
                if (empleadosAsignados.length !== empleadosUnicos.size) {
                    throw new Error('No se puede asignar el mismo empleado más de una vez al mismo servicio.');
                }
                await this.assignResourcesManually(saved.id, dto.asignacionesManual, queryRunner.manager);
            }
            await queryRunner.commitTransaction();
            return saved;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            this.logger.error(`[Service] Error al crear servicio: ${errorMessage}`);
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    getDefaultCantidadEmpleados(tipoServicio) {
        switch (tipoServicio) {
            case resource_states_enum_1.ServiceType.CAPACITACION:
                return 1;
            case resource_states_enum_1.ServiceType.INSTALACION:
            case resource_states_enum_1.ServiceType.LIMPIEZA:
                return 1;
            default:
                return 1;
        }
    }
    async scheduleEmployeeStatusForCapacitacion(service) {
        if (!service.fechaInicio || !service.fechaFin)
            return;
        const asignaciones = await this.assignmentRepository.find({
            where: { servicioId: service.id },
            relations: ['empleado'],
        });
        const empleados = asignaciones
            .map((a) => a.empleadoId)
            .filter((id) => typeof id === 'number');
        for (const empleadoId of empleados) {
            await this.dataSource.manager.query(`INSERT INTO scheduled_employee_statuses (id, nuevo_estado, fecha_cambio, servicio_id) VALUES ($1, $2, $3, $4)`, [empleadoId, 'EN_CAPACITACION', service.fechaInicio, service.id]);
            await this.dataSource.manager.query(`INSERT INTO scheduled_employee_statuses (id, nuevo_estado, fecha_cambio, servicio_id) VALUES ($1, $2, $3, $4)`, [empleadoId, 'DISPONIBLE', service.fechaFin, service.id]);
        }
    }
    async findAll(filters = {}, page = 1, limit = 10) {
        this.logger.log('Recuperando todos los servicios');
        try {
            const queryBuilder = this.serviceRepository
                .createQueryBuilder('service')
                .leftJoinAndSelect('service.asignaciones', 'asignacion')
                .leftJoinAndSelect('service.cliente', 'cliente')
                .leftJoinAndSelect('asignacion.empleado', 'empleado')
                .leftJoinAndSelect('asignacion.vehiculo', 'vehiculo')
                .leftJoinAndSelect('asignacion.bano', 'bano');
            const { search } = filters;
            if (search) {
                const term = `%${search.toLowerCase()}%`;
                queryBuilder
                    .where('LOWER(service.estado::text) LIKE :term', { term })
                    .orWhere('LOWER(service.tipo_servicio::text) LIKE :term', { term })
                    .orWhere('cliente.nombre_empresa IS NULL AND LOWER(service.tipo_servicio::text) LIKE :term', { term })
                    .orWhere('cliente IS NOT NULL AND LOWER(cliente.nombre_empresa) LIKE :term', { term });
            }
            queryBuilder.orderBy('service.fechaProgramada', 'ASC');
            const [services, total] = await queryBuilder
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                data: services,
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
            this.logger.error('Error al obtener los servicios', errorStack);
            throw new Error('Error al obtener los servicios');
        }
    }
    async findOne(id) {
        this.logger.log(`Buscando servicio con id: ${id}`);
        const service = await this.serviceRepository.findOne({
            where: { id },
            relations: [
                'cliente',
                'asignaciones',
                'asignaciones.empleado',
                'asignaciones.vehiculo',
                'asignaciones.bano',
            ],
        });
        if (!service) {
            throw new common_1.NotFoundException(`Servicio con id ${id} no encontrado`);
        }
        return service;
    }
    async update(id, updateServiceDto) {
        this.logger.log(`Actualizando servicio con id: ${id}`);
        const service = await this.findOne(id);
        this.logger.log(`Asignando recursos manualmente al servicio ${service.id}: ${JSON.stringify(service.asignaciones)}`);
        const esCapacitacionActual = service.tipoServicio === resource_states_enum_1.ServiceType.CAPACITACION;
        const esCapacitacionNuevo = updateServiceDto.tipoServicio === resource_states_enum_1.ServiceType.CAPACITACION;
        const esServicioCapacitacion = esCapacitacionActual || esCapacitacionNuevo;
        if (esServicioCapacitacion) {
            if (updateServiceDto.asignacionAutomatica) {
                throw new common_1.BadRequestException(`Para servicios de CAPACITACION, la asignación de empleados debe ser manual`);
            }
            if (updateServiceDto.tipoServicio === resource_states_enum_1.ServiceType.CAPACITACION) {
                if ((updateServiceDto.cantidadBanos !== undefined &&
                    updateServiceDto.cantidadBanos !== 0) ||
                    (service.cantidadBanos !== 0 &&
                        updateServiceDto.cantidadBanos === undefined)) {
                    throw new common_1.BadRequestException(`Para servicios de CAPACITACION, la cantidad de baños debe ser 0`);
                }
                if ((updateServiceDto.cantidadVehiculos !== undefined &&
                    updateServiceDto.cantidadVehiculos !== 0) ||
                    (service.cantidadVehiculos !== 0 &&
                        updateServiceDto.cantidadVehiculos === undefined)) {
                    throw new common_1.BadRequestException(`Para servicios de CAPACITACION, la cantidad de vehículos debe ser 0`);
                }
            }
        }
        if (!service.tipoServicio) {
            this.logger.warn(`El servicio con ID ${id} no tiene un tipo de servicio definido.`);
        }
        let fechaProgramada;
        if (updateServiceDto.fechaProgramada) {
            fechaProgramada = new Date(updateServiceDto.fechaProgramada);
        }
        else {
            fechaProgramada = new Date(service.fechaProgramada);
        }
        if (isNaN(fechaProgramada.getTime())) {
            throw new common_1.BadRequestException('La fecha programada no es válida');
        }
        if (service.estado === resource_states_enum_1.ServiceState.EN_PROGRESO ||
            service.estado === resource_states_enum_1.ServiceState.COMPLETADO ||
            service.estado === resource_states_enum_1.ServiceState.CANCELADO) {
            throw new common_1.BadRequestException(`No se pueden actualizar recursos para un servicio en estado ${service.estado}`);
        }
        Object.assign(service, {
            ...service,
            ...updateServiceDto,
            tipoServicio: updateServiceDto.tipoServicio ?? service.tipoServicio,
            estado: updateServiceDto.estado ?? service.estado,
            clienteId: updateServiceDto.clienteId ?? service.clienteId,
            fechaProgramada,
        });
        const savedService = await this.serviceRepository.save(service);
        this.logger.log(`Servicio actualizado: ${JSON.stringify(savedService)}`);
        let empleadosAsignados = [];
        if (updateServiceDto.asignacionesManual?.length) {
            await this.assignResourcesManually(savedService.id, updateServiceDto.asignacionesManual, this.dataSource.manager);
            empleadosAsignados = updateServiceDto.asignacionesManual
                .map((a) => a.empleadoId)
                .filter((id) => id !== undefined);
        }
        if (savedService.estado === resource_states_enum_1.ServiceState.EN_PROGRESO) {
            const nuevoEstado = this.mapServiceTypeToEmpleadoState(savedService.tipoServicio);
            for (const empleadoId of empleadosAsignados) {
                await this.dataSource.manager.update('employees', { id: empleadoId }, { estado: nuevoEstado });
            }
        }
        if (empleadosAsignados.length > 0) {
            this.logger.log(`Empleados asignados manualmente: ${empleadosAsignados.join(', ')}`);
            const empleados = await this.empleadosRepository.findBy({
                id: (0, typeorm_2.In)(empleadosAsignados),
            });
            this.logger.log(`Empleados encontrados: ${empleados.map((e) => `${e.id}-${e.nombre}`).join(', ')}`);
            const cliente = await this.clientesRepository.findOne({
                where: { clienteId: savedService.cliente?.clienteId },
            });
            if (!cliente) {
                this.logger.warn(`Cliente no encontrado para clienteId: ${savedService.cliente?.clienteId}`);
            }
            const toiletEntities = await this.toiletsRepository.findBy({
                baño_id: (0, typeorm_2.In)(savedService.banosInstalados ?? []),
            });
            this.logger.log(`Baños encontrados: ${toiletEntities.map((b) => b.codigo_interno || `Baño #${b.baño_id}`).join(', ')}`);
            const toilets = toiletEntities.map((b) => b.codigo_interno || `Baño #${b.baño_id}`);
            const clientes = cliente?.nombre
                ? [cliente.nombre]
                : ['Cliente desconocido'];
            const direccion = cliente?.direccion || 'Dirección no especificada';
            const fechaInicio = savedService.fechaInicio?.toISOString().split('T')[0];
            const fechaProgramada = savedService.fechaProgramada
                ?.toISOString()
                .split('T')[0];
            for (const empleado of empleados) {
                if (!empleado.email) {
                    this.logger.warn(`Empleado ${empleado.nombre} (ID ${empleado.id}) no tiene email, no se envía notificación.`);
                    continue;
                }
                try {
                    this.logger.log(`Enviando correo a ${empleado.email} (${empleado.nombre})`);
                    await this.mailerService.sendRouteModified(empleado.email, empleado.nombre, 'Vehículo asignado', toilets, clientes, savedService.tipoServicio, fechaProgramada, direccion, fechaInicio);
                    this.logger.log(`Correo enviado exitosamente a ${empleado.email}`);
                }
                catch (error) {
                    this.logger.error(`Error al enviar correo a ${empleado.email}:`, error);
                }
            }
        }
        return this.findOne(savedService.id);
    }
    mapServiceTypeToEmpleadoState(tipoServicio) {
        switch (tipoServicio) {
            case resource_states_enum_1.ServiceType.CAPACITACION:
                return 'EN_CAPACITACION';
            case resource_states_enum_1.ServiceType.LIMPIEZA:
                return 'EN_LIMPIEZA';
            case resource_states_enum_1.ServiceType.INSTALACION:
                return 'EN_INSTALACION';
            default:
                return 'OCUPADO';
        }
    }
    async remove(id) {
        this.logger.log(`Eliminando servicio con id: ${id}`);
        const service = await this.findOne(id);
        if (service.asignaciones?.length) {
            await this.releaseAssignedResources(service);
            await this.assignmentRepository.delete({ servicioId: id });
        }
        await this.serviceRepository.delete(id);
    }
    async changeStatus(id, nuevoEstado, comentarioIncompleto) {
        this.logger.log(`Cambiando estado del servicio ${id} a ${nuevoEstado}`);
        const service = await this.findOne(id);
        this.validateStatusTransition(service.estado, nuevoEstado);
        if (nuevoEstado === resource_states_enum_1.ServiceState.INCOMPLETO && !comentarioIncompleto) {
            throw new common_1.BadRequestException('Para cambiar un servicio a estado INCOMPLETO, debe proporcionar un comentario explicando el motivo');
        }
        if (nuevoEstado === resource_states_enum_1.ServiceState.EN_PROGRESO) {
            if (!service.fechaInicio) {
                service.fechaInicio = new Date();
            }
            this.logger.log('Servicio iniciado - Los recursos ya están en estado ASIGNADO');
        }
        if (nuevoEstado === resource_states_enum_1.ServiceState.COMPLETADO) {
            if (!service.fechaFin) {
                service.fechaFin = new Date();
            }
            if (service.tipoServicio === resource_states_enum_1.ServiceType.RETIRO &&
                service.banosInstalados?.length > 0) {
                for (const banoId of service.banosInstalados) {
                    await this.toiletsService.update(banoId, {
                        estado: resource_states_enum_1.ResourceState.MANTENIMIENTO,
                    });
                }
            }
            this.logger.log(`Tipo de servicio: ${service.tipoServicio}`);
            if (service.tipoServicio === resource_states_enum_1.ServiceType.LIMPIEZA) {
                this.logger.log(`Buscando limpieza futura activa para servicio ${service.id}`);
                await this.dataSource.query(`
        WITH limpieza_a_desactivar AS (
          SELECT limpieza_id
          FROM future_cleanings
          WHERE "servicioId" = $1 AND "isActive" = true
          ORDER BY limpieza_fecha ASC
          LIMIT 1
        )
        UPDATE future_cleanings
        SET "isActive" = false
        WHERE limpieza_id IN (SELECT limpieza_id FROM limpieza_a_desactivar);
      `, [service.id]);
                this.logger.log(`Limpieza futura relacionada al servicio ${service.id} desactivada.`);
            }
        }
        if (nuevoEstado === resource_states_enum_1.ServiceState.INCOMPLETO) {
            service.fechaFin = new Date();
            service.comentarioIncompleto = comentarioIncompleto || '';
        }
        if (nuevoEstado === resource_states_enum_1.ServiceState.CANCELADO ||
            nuevoEstado === resource_states_enum_1.ServiceState.COMPLETADO ||
            nuevoEstado === resource_states_enum_1.ServiceState.INCOMPLETO) {
            if (service.tipoServicio === resource_states_enum_1.ServiceType.INSTALACION ||
                service.tipoServicio === resource_states_enum_1.ServiceType.RETIRO ||
                service.tipoServicio === resource_states_enum_1.ServiceType.LIMPIEZA ||
                service.tipoServicio === resource_states_enum_1.ServiceType.MANTENIMIENTO_IN_SITU) {
                await this.releaseNonToiletResources(service);
            }
            else {
                await this.releaseAssignedResources(service);
            }
        }
        service.estado = nuevoEstado;
        const savedService = await this.serviceRepository.save(service);
        return savedService;
    }
    async releaseNonToiletResources(service) {
        if (!service.asignaciones) {
            service.asignaciones = await this.assignmentRepository.find({
                where: { servicioId: service.id },
                relations: ['empleado', 'vehiculo'],
            });
        }
        this.logger.log(`Liberando recursos no-baños para el servicio ${service.id}`);
        const otherActiveServices = await this.serviceRepository.find({
            where: {
                id: (0, typeorm_2.Not)(service.id),
                estado: (0, typeorm_2.In)([resource_states_enum_1.ServiceState.PROGRAMADO, resource_states_enum_1.ServiceState.EN_PROGRESO]),
            },
            relations: [
                'asignaciones',
                'asignaciones.empleado',
                'asignaciones.vehiculo',
            ],
        });
        for (const assignment of service.asignaciones) {
            if (assignment.empleado) {
                const isEmployeeInOtherServices = otherActiveServices.some((s) => s.asignaciones.some((a) => a.empleadoId === assignment.empleadoId));
                if (!isEmployeeInOtherServices) {
                    this.logger.log(`Liberando empleado ${assignment.empleado.id}`);
                    await this.employeesService.changeStatus(assignment.empleado.id, resource_states_enum_1.ResourceState.DISPONIBLE);
                }
            }
            if (assignment.vehiculo) {
                const isVehicleInOtherServices = otherActiveServices.some((s) => s.asignaciones.some((a) => a.vehiculoId === assignment.vehiculoId));
                if (!isVehicleInOtherServices) {
                    this.logger.log(`Liberando vehículo ${assignment.vehiculo.id}`);
                    await this.vehiclesService.changeStatus(assignment.vehiculo.id, resource_states_enum_1.ResourceState.DISPONIBLE);
                }
            }
        }
    }
    async assignResourcesManually(serviceId, dtos, manager) {
        const assignments = [];
        const empleadosProcesados = new Set();
        const vehiculosProcesados = new Set();
        const banosProcesados = new Set();
        console.log('--- Inicio assignResourcesManually ---');
        console.log('serviceId:', serviceId);
        console.log('Cantidad de dtos:', dtos.length);
        for (const [index, dto] of dtos.entries()) {
            console.log(`Procesando dto índice ${index}:`, dto);
            if (dto.empleadoId && !empleadosProcesados.has(dto.empleadoId)) {
                const empleado = await this.empleadosRepository.findOne({
                    where: { id: dto.empleadoId },
                });
                if (!empleado) {
                    throw new common_1.NotFoundException(`Empleado con ID ${dto.empleadoId} no encontrado`);
                }
                const assignment = new resource_assignment_entity_1.ResourceAssignment();
                assignment.servicioId = serviceId;
                assignment.empleado = empleado;
                assignment.empleadoId = empleado.id;
                assignment.rolEmpleado = dto.rol ?? null;
                assignments.push(assignment);
                empleadosProcesados.add(empleado.id);
                console.log('Asignación creada para empleado:', assignment);
            }
            if (dto.vehiculoId && !vehiculosProcesados.has(dto.vehiculoId)) {
                const vehiculo = await this.vehiclesRepository.findOne({
                    where: { id: dto.vehiculoId },
                });
                if (!vehiculo) {
                    throw new common_1.NotFoundException(`Vehículo con ID ${dto.vehiculoId} no encontrado`);
                }
                const assignment = new resource_assignment_entity_1.ResourceAssignment();
                assignment.servicioId = serviceId;
                assignment.vehiculo = vehiculo;
                assignment.vehiculoId = vehiculo.id;
                assignments.push(assignment);
                vehiculosProcesados.add(vehiculo.id);
                console.log('Asignación creada para vehículo:', assignment);
            }
            if (dto.banosIds?.length) {
                const banos = await this.toiletsRepository.find({
                    where: { baño_id: (0, typeorm_2.In)(dto.banosIds) },
                });
                const encontrados = banos.map((b) => b.baño_id);
                const noEncontrados = dto.banosIds.filter((id) => !encontrados.includes(id));
                if (noEncontrados.length > 0) {
                    throw new common_1.NotFoundException(`Baños no encontrados con IDs: ${noEncontrados.join(', ')}`);
                }
                for (const bano of banos) {
                    if (!banosProcesados.has(bano.baño_id)) {
                        if (bano.estado === resource_states_enum_1.ResourceState.ASIGNADO) {
                            throw new common_1.BadRequestException(`El baño ${bano.baño_id} (${bano.codigo_interno}) está en estado ASIGNADO y no puede ser asignado a otro servicio`);
                        }
                        const existingAssignment = await manager
                            .createQueryBuilder()
                            .select([
                            'asig.servicio_id as "servicioId"',
                            'servicio.fecha_programada as "fechaProgramada"',
                        ])
                            .from('asignacion_recursos', 'asig')
                            .innerJoin('servicios', 'servicio', 'servicio.id = asig.servicio_id')
                            .where('asig.bano_id = :banoId', { banoId: bano.baño_id })
                            .andWhere('servicio.estado = :estado', {
                            estado: resource_states_enum_1.ServiceState.PROGRAMADO,
                        })
                            .andWhere('asig.servicio_id != :currentServiceId', {
                            currentServiceId: serviceId,
                        })
                            .getRawOne();
                        if (existingAssignment) {
                            const fechaServicio = new Date(existingAssignment.fechaProgramada);
                            console.log(`⚠️ ADVERTENCIA: Baño ${bano.baño_id} (${bano.codigo_interno}) ya está seleccionado para el servicio ${existingAssignment.servicioId} programado para ${fechaServicio.toLocaleDateString()}`);
                        }
                        const assignment = new resource_assignment_entity_1.ResourceAssignment();
                        assignment.servicioId = serviceId;
                        assignment.banoId = bano.baño_id;
                        assignments.push(assignment);
                        banosProcesados.add(bano.baño_id);
                        console.log('Asignación creada para baño:', assignment);
                    }
                }
            }
        }
        console.log('Total de asignaciones a guardar:', assignments.length);
        const saved = await manager.save(assignments);
        console.log('Asignaciones guardadas:', saved.length);
        console.log('Actualizando estados de recursos a ASIGNADO tras crear las asignaciones');
        const empleadosIds = Array.from(empleadosProcesados);
        if (empleadosIds.length > 0) {
            await manager.update('employees', { id: (0, typeorm_2.In)(empleadosIds) }, { estado: resource_states_enum_1.ResourceState.ASIGNADO });
            console.log(`Estados actualizados para empleados: ${empleadosIds.join(', ')}`);
        }
        const vehiculosIds = Array.from(vehiculosProcesados);
        if (vehiculosIds.length > 0) {
            await manager.update('vehicles', { id: (0, typeorm_2.In)(vehiculosIds) }, { estado: resource_states_enum_1.ResourceState.ASIGNADO });
            console.log(`Estados actualizados para vehículos: ${vehiculosIds.join(', ')}`);
        }
        const banosIds = Array.from(banosProcesados);
        if (banosIds.length > 0) {
            await manager.update('chemical_toilets', { baño_id: (0, typeorm_2.In)(banosIds) }, { estado: resource_states_enum_1.ResourceState.ASIGNADO });
            console.log(`Estados actualizados para baños: ${banosIds.join(', ')}`);
        }
        console.log('--- Fin assignResourcesManually ---');
        return saved;
    }
    async releaseAssignedResources(service) {
        if (!service.asignaciones) {
            service.asignaciones = await this.assignmentRepository.find({
                where: { servicioId: service.id },
                relations: ['empleado', 'vehiculo', 'bano'],
            });
        }
        this.logger.log(`Liberando ${service.asignaciones.length} recursos para el servicio ${service.id}`);
        for (const assignment of service.asignaciones) {
            if (assignment.empleado) {
                this.logger.log(`Liberando empleado ${assignment.empleado.id}`);
                await this.employeesService.changeStatus(assignment.empleado.id, resource_states_enum_1.ResourceState.DISPONIBLE);
            }
            if (assignment.vehiculo) {
                this.logger.log(`Liberando vehículo ${assignment.vehiculo.id}`);
                await this.vehiclesService.changeStatus(assignment.vehiculo.id, resource_states_enum_1.ResourceState.DISPONIBLE);
            }
            if (assignment.bano) {
                this.logger.log(`Liberando baño ${assignment.bano.baño_id}`);
                await this.toiletsService.update(assignment.bano.baño_id, {
                    estado: resource_states_enum_1.ResourceState.DISPONIBLE,
                });
            }
        }
    }
    validateStatusTransition(currentState, newState) {
        const validTransitions = {
            [resource_states_enum_1.ServiceState.PROGRAMADO]: [
                resource_states_enum_1.ServiceState.EN_PROGRESO,
                resource_states_enum_1.ServiceState.CANCELADO,
                resource_states_enum_1.ServiceState.SUSPENDIDO,
            ],
            [resource_states_enum_1.ServiceState.EN_PROGRESO]: [
                resource_states_enum_1.ServiceState.COMPLETADO,
                resource_states_enum_1.ServiceState.SUSPENDIDO,
                resource_states_enum_1.ServiceState.INCOMPLETO,
            ],
            [resource_states_enum_1.ServiceState.SUSPENDIDO]: [
                resource_states_enum_1.ServiceState.EN_PROGRESO,
                resource_states_enum_1.ServiceState.CANCELADO,
            ],
            [resource_states_enum_1.ServiceState.COMPLETADO]: [],
            [resource_states_enum_1.ServiceState.CANCELADO]: [],
            [resource_states_enum_1.ServiceState.INCOMPLETO]: [],
        };
        if (!validTransitions[currentState]?.includes(newState)) {
            throw new common_1.BadRequestException(`No se puede cambiar el estado de ${currentState} a ${newState}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        this.logger.log(`Buscando servicios entre ${start.toISOString()} y ${end.toISOString()}`);
        return this.findAll({
            fechaDesde: start.toISOString(),
            fechaHasta: end.toISOString(),
        });
    }
    async getRemainingWeekServices() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sunday = new Date(today);
        const currentDay = today.getDay();
        const daysUntilSunday = (7 - currentDay) % 7;
        sunday.setDate(sunday.getDate() + daysUntilSunday);
        sunday.setHours(23, 59, 59, 999);
        return this.findByDateRange(today.toISOString(), sunday.toISOString());
    }
    async findToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        this.logger.log(`Buscando servicios de hoy: ${today.toISOString()}`);
        return this.findAll({
            fechaDesde: today.toISOString(),
            fechaHasta: endOfDay.toISOString(),
        });
    }
    async findByStatus(estado) {
        this.logger.log(`Buscando servicios con estado: ${estado}`);
        return this.findAll({ estado });
    }
    async verifyResourcesAvailability(service, incremental = false, existingService) {
        this.logger.log(incremental && existingService
            ? 'Verificando disponibilidad de recursos en modo incremental'
            : 'Verificando disponibilidad de recursos en modo completo');
        try {
            const alertas = [];
            if (service.condicionContractualId && !service.tipoServicio) {
                const condicion = await this.condicionesContractualesRepository.findOne({
                    where: { condicionContractualId: service.condicionContractualId },
                });
                if (condicion?.tipo_servicio) {
                    service.tipoServicio = condicion.tipo_servicio;
                    if (service.cantidadBanos === undefined && condicion.cantidad_banos) {
                        service.cantidadBanos = condicion.cantidad_banos;
                    }
                }
            }
            if (!service.tipoServicio) {
                throw new common_1.BadRequestException('El tipo de servicio es obligatorio');
            }
            const requiereNuevosBanos = [
                resource_states_enum_1.ServiceType.INSTALACION,
                resource_states_enum_1.ServiceType.TRASLADO,
                resource_states_enum_1.ServiceType.REUBICACION,
            ].includes(service.tipoServicio);
            const requiereBanosInstalados = [
                resource_states_enum_1.ServiceType.LIMPIEZA,
                resource_states_enum_1.ServiceType.REEMPLAZO,
                resource_states_enum_1.ServiceType.RETIRO,
                resource_states_enum_1.ServiceType.MANTENIMIENTO_IN_SITU,
                resource_states_enum_1.ServiceType.REPARACION,
            ].includes(service.tipoServicio);
            const employeesNeeded = service.cantidadEmpleados ?? 0;
            const vehiclesNeeded = service.cantidadVehiculos ?? 0;
            const toiletsNeeded = requiereNuevosBanos ? service.cantidadBanos : 0;
            if (requiereNuevosBanos && service.cantidadBanos <= 0) {
                throw new common_1.BadRequestException(`Para servicios de tipo ${service.tipoServicio}, debe especificar una cantidad de baños mayor a 0`);
            }
            if (requiereBanosInstalados) {
                if (!service.banosInstalados?.length) {
                    throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, debe especificar los IDs de los baños instalados`);
                }
                for (const banoId of service.banosInstalados) {
                    const bano = await this.toiletsRepository.findOne({
                        where: { baño_id: banoId },
                    });
                    if (!bano) {
                        throw new common_1.BadRequestException(`El baño con ID ${banoId} no existe`);
                    }
                    if (![resource_states_enum_1.ResourceState.ASIGNADO, resource_states_enum_1.ResourceState.DISPONIBLE].includes(bano.estado)) {
                        throw new common_1.BadRequestException(`El baño con ID ${banoId} no está en estado válido. Estado actual: ${bano.estado}`);
                    }
                }
            }
            const fechaServicio = new Date(service.fechaProgramada);
            if (employeesNeeded > 0) {
                const empleadosResponse = await this.employeesService.findAll({
                    page: 1,
                    limit: 100,
                });
                const empleados = (empleadosResponse.data ?? []);
                const candidatos = empleados.filter((e) => [resource_states_enum_1.ResourceState.DISPONIBLE, resource_states_enum_1.ResourceState.ASIGNADO].includes(e.estado));
                const disponibles = [];
                for (const emp of candidatos) {
                    const enLicencia = !(await this.employeeLeavesService.isEmployeeAvailable(emp.id, fechaServicio));
                    if (enLicencia) {
                        throw new common_1.BadRequestException(`El empleado ${emp.id} está en licencia o capacitación en la fecha del servicio.`);
                    }
                    const conflicto = await this.serviceRepository
                        .createQueryBuilder('servicio')
                        .innerJoin('servicio.asignaciones', 'asig')
                        .innerJoin('asig.empleado', 'emp')
                        .andWhere('emp.id = :id', { id: emp.id })
                        .andWhere('servicio.fechaProgramada = :fecha', {
                        fecha: fechaServicio,
                    })
                        .andWhere(incremental && existingService
                        ? 'servicio.id != :servicioId'
                        : '1=1', { servicioId: existingService?.id })
                        .getOne();
                    if (conflicto) {
                        alertas.push(`Empleado ${emp.id} ya asignado al servicio ${conflicto.id} en esa fecha`);
                    }
                    disponibles.push(emp);
                }
                if (disponibles.length < employeesNeeded) {
                    throw new common_1.BadRequestException(`No hay suficientes empleados disponibles. Se necesitan ${employeesNeeded}, hay ${disponibles.length}`);
                }
            }
            if (vehiclesNeeded > 0) {
                const vehicles = await this.vehiclesRepository.find({
                    where: [
                        { estado: resource_states_enum_1.ResourceState.DISPONIBLE },
                        { estado: resource_states_enum_1.ResourceState.ASIGNADO },
                    ],
                });
                const disponibles = [];
                for (const vehicle of vehicles) {
                    const conflicto = await this.serviceRepository
                        .createQueryBuilder('servicio')
                        .innerJoin('servicio.asignaciones', 'asig')
                        .innerJoin('asig.vehiculo', 'veh')
                        .where('veh.id = :id', { id: vehicle.id })
                        .andWhere('servicio.fechaProgramada = :fecha', {
                        fecha: fechaServicio,
                    })
                        .andWhere(incremental && existingService
                        ? 'servicio.id != :servicioId'
                        : '1=1', { servicioId: existingService?.id })
                        .getOne();
                    if (conflicto) {
                        alertas.push(`Vehículo ${vehicle.id} ya asignado al servicio ${conflicto.id} en esa fecha`);
                    }
                    disponibles.push(vehicle);
                }
                if (disponibles.length < vehiclesNeeded) {
                    throw new common_1.BadRequestException(`No hay suficientes vehículos disponibles. Se necesitan ${vehiclesNeeded}, hay ${disponibles.length}`);
                }
            }
            if (toiletsNeeded > 0) {
                const disponibles = await this.toiletsRepository.find({
                    where: { estado: resource_states_enum_1.ResourceState.DISPONIBLE },
                });
                if (disponibles.length < toiletsNeeded) {
                    throw new common_1.BadRequestException(`No hay suficientes baños disponibles. Se necesitan ${toiletsNeeded}, hay ${disponibles.length}`);
                }
            }
            if (requiereBanosInstalados && service.banosInstalados?.length) {
                for (const banoId of service.banosInstalados) {
                    const conflicto = await this.serviceRepository
                        .createQueryBuilder('servicio')
                        .innerJoin('servicio.asignaciones', 'asig')
                        .innerJoin('asig.bano', 'bano')
                        .where('bano.baño_id = :banoId', { banoId })
                        .andWhere('servicio.fechaProgramada = :fecha', {
                        fecha: fechaServicio,
                    })
                        .andWhere('servicio.estado IN (:...estados)', {
                        estados: [resource_states_enum_1.ServiceState.PROGRAMADO, resource_states_enum_1.ServiceState.EN_PROGRESO],
                    })
                        .andWhere(incremental && existingService
                        ? 'servicio.id != :servicioId'
                        : '1=1', { servicioId: existingService?.id })
                        .getOne();
                    if (conflicto) {
                        throw new common_1.BadRequestException(`El baño ${banoId} ya está asignado al servicio ${conflicto.id} en la fecha ${fechaServicio.toLocaleDateString()}`);
                    }
                }
            }
            if (alertas.length > 0) {
                this.logger.warn('Conflictos detectados con recursos asignados (no se bloqueará la creación):');
                alertas.forEach((msg) => this.logger.warn(msg));
                service.__conflictosAsignacion = alertas;
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new common_1.BadRequestException(`Error al verificar disponibilidad: ${message}`);
        }
    }
    validateServiceTypeSpecificRequirements(service) {
        if (service.condicionContractualId && !service.tipoServicio) {
            return;
        }
        const serviciosConBanosInstalados = [
            resource_states_enum_1.ServiceType.LIMPIEZA,
            resource_states_enum_1.ServiceType.RETIRO,
            resource_states_enum_1.ServiceType.REEMPLAZO,
            resource_states_enum_1.ServiceType.MANTENIMIENTO_IN_SITU,
            resource_states_enum_1.ServiceType.REPARACION,
        ];
        const serviciosConBanosNuevos = [
            resource_states_enum_1.ServiceType.INSTALACION,
            resource_states_enum_1.ServiceType.TRASLADO,
            resource_states_enum_1.ServiceType.REUBICACION,
            resource_states_enum_1.ServiceType.MANTENIMIENTO,
        ];
        const serviciosSoloEmpleados = [resource_states_enum_1.ServiceType.CAPACITACION];
        if (!service.tipoServicio) {
            return;
        }
        if (serviciosSoloEmpleados.includes(service.tipoServicio)) {
            if (service.cantidadBanos !== 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, la cantidad de baños debe ser 0 ya que no se utilizan baños`);
            }
            if (service.cantidadVehiculos !== 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, la cantidad de vehículos debe ser 0 ya que no se utilizan vehículos`);
            }
            if (service.banosInstalados && service.banosInstalados.length > 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, no se debe especificar el campo 'banosInstalados'`);
            }
            if (service.asignacionAutomatica) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, la asignación de empleados debe ser manual (asignacionAutomatica debe ser false)`);
            }
            if (!service.asignacionesManual ||
                service.asignacionesManual.length === 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, debe especificar los empleados a asignar en el campo 'asignacionesManual'`);
            }
        }
        if (serviciosConBanosInstalados.includes(service.tipoServicio)) {
            if (service.cantidadBanos !== 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, la cantidad de baños debe ser 0 ya que se operará sobre baños ya instalados`);
            }
            if (!service.banosInstalados || service.banosInstalados.length === 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, debe especificar los IDs de los baños ya instalados en el campo 'banosInstalados'`);
            }
        }
        if (serviciosConBanosNuevos.includes(service.tipoServicio)) {
            if (service.cantidadBanos !== undefined && service.cantidadBanos <= 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, la cantidad de baños debe ser mayor a 0`);
            }
            if (service.banosInstalados && service.banosInstalados.length > 0) {
                throw new common_1.BadRequestException(`Para servicios de ${service.tipoServicio}, no se debe especificar el campo 'banosInstalados'`);
            }
        }
    }
    async getProximosServicios() {
        this.logger.log('Obteniendo los próximos 5 servicios');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        try {
            const servicios = await this.serviceRepository.find({
                where: {
                    fechaProgramada: (0, typeorm_2.MoreThanOrEqual)(today),
                    estado: resource_states_enum_1.ServiceState.PROGRAMADO,
                },
                relations: [
                    'cliente',
                    'asignaciones',
                    'asignaciones.empleado',
                    'asignaciones.vehiculo',
                    'asignaciones.bano',
                ],
                order: {
                    fechaProgramada: 'ASC',
                },
                take: 5,
            });
            this.logger.log(`Encontrados ${servicios.length} próximos servicios`);
            return servicios;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            this.logger.error(`Error al obtener próximos servicios: ${errorMessage}`);
            throw new common_1.BadRequestException(`Error al obtener próximos servicios: ${errorMessage}`);
        }
    }
    async getStats() {
        const total = await this.serviceRepository.count();
        const totalInstalacion = await this.serviceRepository.count({
            where: { tipoServicio: resource_states_enum_1.ServiceType.INSTALACION },
        });
        const totalLimpieza = await this.serviceRepository.count({
            where: { tipoServicio: resource_states_enum_1.ServiceType.LIMPIEZA },
        });
        const totalRetiro = await this.serviceRepository.count({
            where: { tipoServicio: resource_states_enum_1.ServiceType.RETIRO },
        });
        return {
            totalInstalacion,
            totalLimpieza,
            totalRetiro,
            total,
        };
    }
    async getResumenServicios() {
        this.logger.log('Obteniendo resumen de servicios');
    }
    async getCapacitacionServices(page, limit, search) {
        const queryBuilder = this.serviceRepository
            .createQueryBuilder('service')
            .leftJoinAndSelect('service.cliente', 'cliente')
            .leftJoinAndSelect('service.asignaciones', 'asignaciones')
            .leftJoinAndSelect('asignaciones.empleado', 'empleado')
            .leftJoinAndSelect('asignaciones.vehiculo', 'vehiculo')
            .leftJoinAndSelect('asignaciones.bano', 'bano')
            .where('service.tipoServicio = :tipoServicio', {
            tipoServicio: resource_states_enum_1.ServiceType.CAPACITACION,
        });
        if (search) {
            const term = `%${search.toLowerCase()}%`;
            queryBuilder.andWhere('(LOWER(service.estado::text) LIKE :term OR ' +
                "COALESCE(LOWER(cliente.nombre_empresa), '') LIKE :term OR " +
                "COALESCE(LOWER(service.ubicacion), '') LIKE :term OR " +
                "COALESCE(LOWER(service.notas), '') LIKE :term)", { term });
        }
        queryBuilder.orderBy('service.fechaProgramada', 'ASC');
        const [services, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: services,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getInstalacionServices(page, limit) {
        const queryBuilder = this.serviceRepository
            .createQueryBuilder('service')
            .leftJoinAndSelect('service.cliente', 'cliente')
            .leftJoinAndSelect('service.asignaciones', 'asignaciones')
            .leftJoinAndSelect('asignaciones.empleado', 'empleado')
            .leftJoinAndSelect('asignaciones.vehiculo', 'vehiculo')
            .leftJoinAndSelect('asignaciones.bano', 'bano')
            .where('service.tipoServicio = :tipoServicio', {
            tipoServicio: resource_states_enum_1.ServiceType.INSTALACION,
        })
            .orderBy('service.fechaProgramada', 'ASC');
        const [services, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: services,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getLimpiezaServices(page, limit) {
        const serviceTypes = [
            resource_states_enum_1.ServiceType.LIMPIEZA,
            resource_states_enum_1.ServiceType.MANTENIMIENTO,
            resource_states_enum_1.ServiceType.MANTENIMIENTO_IN_SITU,
            resource_states_enum_1.ServiceType.REPARACION,
            resource_states_enum_1.ServiceType.REEMPLAZO,
            resource_states_enum_1.ServiceType.RETIRO,
            resource_states_enum_1.ServiceType.TRASLADO,
            resource_states_enum_1.ServiceType.REUBICACION,
        ];
        const queryBuilder = this.serviceRepository
            .createQueryBuilder('service')
            .leftJoinAndSelect('service.cliente', 'cliente')
            .leftJoinAndSelect('service.asignaciones', 'asignaciones')
            .leftJoinAndSelect('asignaciones.empleado', 'empleado')
            .leftJoinAndSelect('asignaciones.vehiculo', 'vehiculo')
            .leftJoinAndSelect('asignaciones.bano', 'bano')
            .where('service.tipoServicio IN (:...serviceTypes)', { serviceTypes })
            .orderBy('service.fechaProgramada', 'ASC');
        const [services, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: services,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getLastServices(employeeId) {
        this.logger.log(`Obteniendo últimos servicios realizados por el empleado ${employeeId}`);
        try {
            const services = await this.serviceRepository.find({
                where: {
                    estado: resource_states_enum_1.ServiceState.COMPLETADO,
                    asignaciones: {
                        empleadoId: employeeId,
                    },
                },
                relations: [
                    'cliente',
                    'asignaciones',
                    'asignaciones.empleado',
                    'asignaciones.vehiculo',
                    'asignaciones.bano',
                ],
                order: {
                    fechaFin: 'DESC',
                },
                take: 5,
            });
            if (services.length === 0) {
                this.logger.log(`No se encontraron servicios completados para el empleado ${employeeId}`);
            }
            else {
                this.logger.log(`Se encontraron ${services.length} servicios completados para el empleado ${employeeId}`);
            }
            return services;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            this.logger.error(`Error al obtener los últimos servicios del empleado ${employeeId}: ${errorMessage}`);
            throw new common_1.BadRequestException(`Error al obtener los últimos servicios: ${errorMessage}`);
        }
    }
    async getCompletedServices(employeeId, paginationDto) {
        const { page = 1, limit = 10, search } = paginationDto;
        const query = this.serviceRepository
            .createQueryBuilder('service')
            .leftJoinAndSelect('service.asignaciones', 'asignacion')
            .leftJoinAndSelect('asignacion.empleado', 'empleado')
            .leftJoinAndSelect('service.cliente', 'cliente')
            .where('empleado.id = :employeeId', { employeeId })
            .andWhere('service.estado = :estado', {
            estado: resource_states_enum_1.ServiceState.COMPLETADO,
        });
        if (search) {
            query.andWhere('(LOWER(cliente.nombre) LIKE :search OR LOWER(service.ubicacion) LIKE :search)', { search: `%${search.toLowerCase()}%` });
        }
        const [servicios, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: servicios,
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getAssignedPendings(employeeId) {
        const services = await this.serviceRepository.find({
            where: {
                estado: resource_states_enum_1.ServiceState.PROGRAMADO,
                asignaciones: {
                    empleadoId: employeeId,
                },
            },
            relations: [
                'cliente',
                'asignaciones',
                'asignaciones.empleado',
                'asignaciones.vehiculo',
                'asignaciones.bano',
            ],
        });
        return services;
    }
    async getAssignedInProgress(employeeId) {
        const services = await this.serviceRepository.find({
            where: {
                estado: resource_states_enum_1.ServiceState.EN_PROGRESO,
                asignaciones: {
                    empleadoId: employeeId,
                },
            },
            relations: [
                'cliente',
                'asignaciones',
                'asignaciones.empleado',
                'asignaciones.vehiculo',
                'asignaciones.bano',
            ],
        });
        return services;
    }
    async validateResourcesAvailability(dto) {
        const warnings = [];
        const errors = [];
        try {
            if (dto.asignacionesManual?.length) {
                for (const assignment of dto.asignacionesManual) {
                    if (assignment.banosIds?.length) {
                        const banos = await this.toiletsRepository.find({
                            where: { baño_id: (0, typeorm_2.In)(assignment.banosIds) },
                        });
                        for (const bano of banos) {
                            if (bano.estado === resource_states_enum_1.ResourceState.ASIGNADO) {
                                errors.push(`El baño ${bano.baño_id} (${bano.codigo_interno}) está en estado ASIGNADO y no puede ser asignado a otro servicio`);
                                continue;
                            }
                            const existingAssignment = (await this.assignmentRepository
                                .createQueryBuilder('asig')
                                .innerJoin('asig.servicio', 'servicio')
                                .select([
                                'servicio.id as "servicioId"',
                                'servicio.fecha_programada as "fechaProgramada"',
                            ])
                                .where('asig.bano_id = :banoId', { banoId: bano.baño_id })
                                .andWhere('servicio.estado = :estado', {
                                estado: resource_states_enum_1.ServiceState.PROGRAMADO,
                            })
                                .getRawOne());
                            if (existingAssignment) {
                                const fechaServicio = new Date(existingAssignment.fechaProgramada);
                                warnings.push(`El baño ${bano.baño_id} (${bano.codigo_interno}) ya está seleccionado para el servicio ${existingAssignment.servicioId} programado para ${fechaServicio.toLocaleDateString('es-ES')}`);
                            }
                        }
                    }
                }
            }
            try {
                const tempService = new service_entity_1.Service();
                Object.assign(tempService, {
                    fechaProgramada: dto.fechaProgramada,
                    tipoServicio: dto.tipoServicio,
                    cantidadBanos: dto.cantidadBanos,
                    cantidadEmpleados: this.getDefaultCantidadEmpleados(dto.tipoServicio),
                    cantidadVehiculos: dto.cantidadVehiculos,
                    banosInstalados: dto.banosInstalados,
                    condicionContractualId: dto.condicionContractualId,
                });
                await this.verifyResourcesAvailability(tempService);
            }
            catch (error) {
                if (error instanceof common_1.BadRequestException) {
                    errors.push(error.message);
                }
            }
            return {
                valid: errors.length === 0,
                warnings,
                errors,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            return {
                valid: false,
                warnings,
                errors: [`Error al validar recursos: ${errorMessage}`],
            };
        }
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = ServicesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(resource_assignment_entity_1.ResourceAssignment)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(3, (0, typeorm_1.InjectRepository)(employee_entity_1.Empleado)),
    __param(4, (0, typeorm_1.InjectRepository)(chemical_toilet_entity_1.ChemicalToilet)),
    __param(11, (0, typeorm_1.InjectRepository)(contractual_conditions_entity_1.CondicionesContractuales)),
    __param(15, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        clients_service_1.ClientService,
        employees_service_1.EmployeesService,
        vehicles_service_1.VehiclesService,
        chemical_toilets_service_1.ChemicalToiletsService,
        vehicle_maintenance_service_1.VehicleMaintenanceService,
        toilet_maintenance_service_1.ToiletMaintenanceService,
        typeorm_2.Repository,
        employee_leaves_service_1.EmployeeLeavesService,
        typeorm_2.DataSource,
        futureCleanings_service_1.FutureCleaningsService,
        typeorm_2.Repository,
        mailer_service_1.MailerService])
], ServicesService);
//# sourceMappingURL=services.service.js.map