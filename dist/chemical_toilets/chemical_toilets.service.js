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
exports.ChemicalToiletsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chemical_toilet_entity_1 = require("./entities/chemical_toilet.entity");
const typeorm_2 = require("typeorm");
const resource_states_enum_1 = require("../common/enums/resource-states.enum");
const service_entity_1 = require("../services/entities/service.entity");
let ChemicalToiletsService = class ChemicalToiletsService {
    constructor(chemicalToiletRepository, serviceRepository) {
        this.chemicalToiletRepository = chemicalToiletRepository;
        this.serviceRepository = serviceRepository;
    }
    async create(createChemicalToiletDto) {
        const newToilet = this.chemicalToiletRepository.create(createChemicalToiletDto);
        try {
            return await this.chemicalToiletRepository.save(newToilet);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.BadRequestException('Ya existe un baño químico con ese código interno.');
            }
            throw new common_1.BadRequestException('Error al crear el baño químico.');
        }
    }
    async findAll(paginationDto, search) {
        const { limit = 10, page = 1 } = paginationDto;
        const query = this.chemicalToiletRepository.createQueryBuilder('toilet');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            query.where(`LOWER(UNACCENT(CAST(toilet.estado AS TEXT))) LIKE :searchTerm
      OR LOWER(UNACCENT(toilet.modelo)) LIKE :searchTerm
      OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :searchTerm`, { searchTerm: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                query.andWhere(`LOWER(UNACCENT(CAST(toilet.estado AS TEXT))) LIKE :searchTerm${i}
        OR LOWER(UNACCENT(toilet.modelo)) LIKE :searchTerm${i}
        OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :searchTerm${i}`, { [`searchTerm${i}`]: `%${searchTerms[i]}%` });
            }
        }
        query.skip((page - 1) * limit).take(limit);
        const [items, total] = await query.getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllWithFilters(filterDto) {
        const { search, estado, modelo, codigoInterno, fechaDesde, fechaHasta, page = 1, limit = 10, } = filterDto;
        const query = this.chemicalToiletRepository.createQueryBuilder('toilet');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            query.andWhere(`(LOWER(UNACCENT(CAST(toilet.estado AS TEXT))) LIKE :term0
      OR LOWER(UNACCENT(toilet.modelo)) LIKE :term0
      OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :term0)`, { term0: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                query.andWhere(`(LOWER(UNACCENT(CAST(toilet.estado AS TEXT))) LIKE :term${i}
        OR LOWER(UNACCENT(toilet.modelo)) LIKE :term${i}
        OR LOWER(UNACCENT(toilet.codigo_interno)) LIKE :term${i})`, { [`term${i}`]: `%${searchTerms[i]}%` });
            }
        }
        else {
            if (estado) {
                query.andWhere('LOWER(UNACCENT(CAST(toilet.estado AS TEXT))) LIKE :estado', { estado: `%${estado.toLowerCase()}%` });
            }
            if (modelo) {
                query.andWhere('LOWER(UNACCENT(toilet.modelo)) LIKE :modelo', {
                    modelo: `%${modelo.toLowerCase()}%`,
                });
            }
            if (codigoInterno) {
                query.andWhere('LOWER(UNACCENT(toilet.codigo_interno)) LIKE :codigoInterno', { codigoInterno: `%${codigoInterno.toLowerCase()}%` });
            }
        }
        if (fechaDesde) {
            query.andWhere('toilet.fecha_adquisicion >= :fechaDesde', {
                fechaDesde,
            });
        }
        if (fechaHasta) {
            query.andWhere('toilet.fecha_adquisicion <= :fechaHasta', {
                fechaHasta,
            });
        }
        query.orderBy('toilet.baño_id', 'ASC');
        query.skip((page - 1) * limit).take(limit);
        const [items, total] = await query.getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllByState(estado, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        return this.chemicalToiletRepository.find({
            where: { estado },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findById(id) {
        const toilet = await this.chemicalToiletRepository.findOne({
            where: { baño_id: id },
        });
        if (!toilet) {
            throw new common_1.NotFoundException(`Baño químico con ID ${id} no encontrado`);
        }
        return toilet;
    }
    async update(id, updateChemicalToiletDto) {
        const toilet = await this.chemicalToiletRepository.findOne({
            where: { baño_id: id },
        });
        if (!toilet) {
            throw new common_1.NotFoundException(`Baño químico con ID ${id} no encontrado`);
        }
        Object.assign(toilet, updateChemicalToiletDto);
        return this.chemicalToiletRepository.save(toilet);
    }
    async remove(id) {
        const toilet = await this.chemicalToiletRepository.findOne({
            where: { baño_id: id },
            relations: ['maintenances'],
        });
        if (!toilet) {
            throw new common_1.NotFoundException(`Baño químico con ID ${id} no encontrado`);
        }
        const toiletWithAssignments = await this.chemicalToiletRepository
            .createQueryBuilder('toilet')
            .leftJoinAndSelect('asignacion_recursos', 'asignacion', 'asignacion.bano_id = toilet.baño_id')
            .leftJoinAndSelect('servicios', 'servicio', 'asignacion.servicio_id = servicio.servicio_id')
            .where('toilet.baño_id = :id', { id })
            .andWhere('asignacion.bano_id IS NOT NULL')
            .getOne();
        if (toiletWithAssignments) {
            throw new common_1.BadRequestException(`El baño químico no puede ser eliminado ya que se encuentra asignado a uno o más servicios.`);
        }
        if (toilet.maintenances &&
            toilet.maintenances.some((maintenance) => !maintenance.completado)) {
            throw new common_1.BadRequestException(`El baño químico no puede ser eliminado ya que tiene mantenimientos programados pendientes.`);
        }
        await this.chemicalToiletRepository.remove(toilet);
    }
    async getMaintenanceStats(id) {
        const toilet = await this.chemicalToiletRepository.findOne({
            where: { baño_id: id },
            relations: ['maintenances'],
        });
        if (!toilet) {
            throw new common_1.NotFoundException(`Baño químico con ID ${id} no encontrado`);
        }
        const totalMaintenances = toilet.maintenances.length;
        const totalCost = toilet.maintenances.reduce((sum, m) => sum + m.costo, 0);
        const lastMaintenance = toilet.maintenances.sort((a, b) => new Date(b.fecha_mantenimiento).getTime() -
            new Date(a.fecha_mantenimiento).getTime())[0];
        return {
            totalMaintenances,
            totalCost,
            lastMaintenance: lastMaintenance
                ? {
                    fecha: lastMaintenance.fecha_mantenimiento,
                    tipo: lastMaintenance.tipo_mantenimiento,
                    tecnico: lastMaintenance.tecnicoResponsable?.nombre +
                        ' ' +
                        lastMaintenance.tecnicoResponsable?.apellido,
                }
                : null,
            daysSinceLastMaintenance: lastMaintenance
                ? Math.floor((new Date().getTime() -
                    new Date(lastMaintenance.fecha_mantenimiento).getTime()) /
                    (1000 * 60 * 60 * 24))
                : null,
        };
    }
    async findByClientId(clientId) {
        const toilets = await this.chemicalToiletRepository
            .createQueryBuilder('bano')
            .innerJoin('asignacion_recursos', 'asignacion', 'asignacion.bano_id = bano.baño_id')
            .innerJoin('servicios', 'service', 'service.servicio_id = asignacion.servicio_id')
            .where('service.cliente_id = :clientId', { clientId })
            .andWhere('bano.estado = :estado', {
            estado: resource_states_enum_1.ResourceState.ASIGNADO.toString(),
        })
            .getMany();
        return toilets;
    }
    async findServicesByToiletId(toiletId) {
        const services = await this.chemicalToiletRepository
            .createQueryBuilder('bano')
            .innerJoin('asignacion_recursos', 'asignacion', 'asignacion.bano_id = bano.baño_id')
            .innerJoin('servicios', 'service', 'service.servicio_id = asignacion.servicio_id')
            .innerJoin('clients', 'client', 'client.cliente_id = service.cliente_id')
            .select([
            'service.servicio_id as servicioId',
            'service.tipo_servicio as tipoServicio',
            'service.ubicacion as ubicacionServicio',
            'service.notas as notasServicio',
            'service.fecha_programada as fechaProgramada',
            'service.fecha_inicio as fechaInicio',
            'service.fecha_fin as fechaFin',
            'service.estado as estadoServicio',
            'client.cliente_id as clienteId',
            'client.nombre_empresa as clienteNombre',
            'client.email as clienteEmail',
            'client.telefono as clienteTelefono',
            'client.direccion as clienteDireccion',
        ])
            .where('bano.baño_id = :toiletId', { toiletId })
            .getRawMany();
        return services;
    }
    async getTotalChemicalToilets() {
        const total = await this.chemicalToiletRepository.count();
        const totalDisponibles = await this.chemicalToiletRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.DISPONIBLE },
        });
        const totalMantenimiento = await this.chemicalToiletRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.MANTENIMIENTO },
        });
        const totalAsignado = await this.chemicalToiletRepository.count({
            where: { estado: resource_states_enum_1.ResourceState.ASIGNADO },
        });
        return {
            total,
            totalDisponibles,
            totalMantenimiento,
            totalAsignado,
        };
    }
};
exports.ChemicalToiletsService = ChemicalToiletsService;
exports.ChemicalToiletsService = ChemicalToiletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chemical_toilet_entity_1.ChemicalToilet)),
    __param(1, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChemicalToiletsService);
//# sourceMappingURL=chemical_toilets.service.js.map