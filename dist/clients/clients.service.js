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
var ClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./entities/client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chemical_toilets_service_1 = require("../chemical_toilets/chemical_toilets.service");
const contractual_conditions_entity_1 = require("../contractual_conditions/entities/contractual_conditions.entity");
let ClientService = ClientService_1 = class ClientService {
    constructor(clientRepository, condicionesContractualesRepository, chemicalToiletsService) {
        this.clientRepository = clientRepository;
        this.condicionesContractualesRepository = condicionesContractualesRepository;
        this.chemicalToiletsService = chemicalToiletsService;
        this.logger = new common_1.Logger(ClientService_1.name);
    }
    async create(createClientDto) {
        this.logger.log(`Creando cliente: ${createClientDto.nombre}`);
        const existingClient = await this.clientRepository.findOne({
            where: { cuit: createClientDto.cuit },
        });
        if (existingClient) {
            throw new common_1.ConflictException(`Ya existe un cliente con el CUIT ${createClientDto.cuit}`);
        }
        const client = this.clientRepository.create(createClientDto);
        return this.clientRepository.save(client);
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, search } = paginationDto;
        this.logger.log(`Recuperando clientes - Página: ${page}, Límite: ${limit}, Búsqueda: ${search}`);
        const query = this.clientRepository.createQueryBuilder('cliente');
        if (search) {
            const searchTerms = search.toLowerCase().split(' ');
            query.where(`LOWER(UNACCENT(cliente.nombre)) LIKE :term
        OR LOWER(UNACCENT(cliente.cuit)) LIKE :term
        OR LOWER(UNACCENT(cliente.email)) LIKE :term
        OR LOWER(UNACCENT(cliente.estado)) LIKE :term
        OR LOWER(UNACCENT(cliente.direccion)) LIKE :term
        OR LOWER(UNACCENT(cliente.contacto_principal)) LIKE :term`, { term: `%${searchTerms[0]}%` });
            for (let i = 1; i < searchTerms.length; i++) {
                query.andWhere(`LOWER(UNACCENT(cliente.nombre)) LIKE :term${i}
          OR LOWER(UNACCENT(cliente.cuit)) LIKE :term${i}
          OR LOWER(UNACCENT(cliente.email)) LIKE :term${i}
          OR LOWER(UNACCENT(cliente.estado)) LIKE :term${i}
          OR LOWER(UNACCENT(cliente.direccion)) LIKE :term${i}
          OR LOWER(UNACCENT(cliente.contacto_principal)) LIKE :term${i}`, { [`term${i}`]: `%${searchTerms[i]}%` });
            }
        }
        const [items, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOneClient(clienteId) {
        this.logger.log(`Buscando cliente con id: ${clienteId}`);
        const client = await this.clientRepository.findOne({
            where: { clienteId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with id ${clienteId} not found`);
        }
        return client;
    }
    async updateClient(clienteId, updateClientDto) {
        this.logger.log(`Actualizando cliente con id: ${clienteId}`);
        const client = await this.clientRepository.findOne({
            where: { clienteId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`El cliente con id ${clienteId} no se encuentra`);
        }
        Object.assign(client, updateClientDto);
        try {
            return await this.clientRepository.save(client);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.driverError?.code === '23505' &&
                error.driverError.detail?.includes('cuit')) {
                throw new common_1.ConflictException('El CUIT ya está registrado para otro cliente.');
            }
            throw error;
        }
    }
    async deleteClient(clienteId) {
        this.logger.log(`Eliminando cliente con id: ${clienteId}`);
        const client = await this.clientRepository.findOne({
            where: { clienteId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with id ${clienteId} not found`);
        }
        try {
            await this.clientRepository.delete(clienteId);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.code === '23503') {
                throw new common_1.ConflictException(`No se puede eliminar el cliente con ID ${clienteId} porque tiene servicios asociados.`);
            }
            throw new common_1.InternalServerErrorException('Error interno del servidor');
        }
    }
    async getActiveContract(clientId) {
        const client = await this.findOneClient(clientId);
        const contratos = await this.condicionesContractualesRepository.find({
            where: {
                cliente: { clienteId: clientId },
                estado: contractual_conditions_entity_1.EstadoContrato.ACTIVO,
                fecha_fin: (0, typeorm_2.MoreThan)(new Date()),
            },
            order: { fecha_fin: 'DESC' },
        });
        if (!contratos || contratos.length === 0) {
            throw new common_1.NotFoundException(`No hay contratos activos para el cliente ${client.nombre}`);
        }
        return {
            contrato: contratos[0],
            banosAsignados: await this.chemicalToiletsService.findByClientId(clientId),
        };
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = ClientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __param(1, (0, typeorm_1.InjectRepository)(contractual_conditions_entity_1.CondicionesContractuales)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        chemical_toilets_service_1.ChemicalToiletsService])
], ClientService);
//# sourceMappingURL=clients.service.js.map