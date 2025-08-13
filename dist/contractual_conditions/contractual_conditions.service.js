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
exports.ContractualConditionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contractual_conditions_entity_1 = require("./entities/contractual_conditions.entity");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../clients/entities/client.entity");
let ContractualConditionsService = class ContractualConditionsService {
    constructor(contractualConditionsRepository, clientRepository) {
        this.contractualConditionsRepository = contractualConditionsRepository;
        this.clientRepository = clientRepository;
    }
    async getAllContractualConditions(page = 1, limit = 10, search) {
        if (page < 1 || limit < 1) {
            throw new Error(`Parámetros de paginación inválidos: "page" y "limit" deben ser mayores que 0. Recibido page=${page}, limit=${limit}.`);
        }
        const queryBuilder = this.contractualConditionsRepository
            .createQueryBuilder('condicion')
            .leftJoinAndSelect('condicion.cliente', 'cliente');
        if (search) {
            const words = search.trim().split(/\s+/);
            const orConditions = [];
            const parameters = {};
            words.forEach((word, idx) => {
                const param = `search${idx}`;
                parameters[param] = `%${word}%`;
                orConditions.push(`condicion.condiciones_especificas LIKE :${param}`);
                orConditions.push(`CAST(condicion.tipo_servicio AS TEXT) LIKE :${param}`);
                orConditions.push(`CAST(condicion.periodicidad AS TEXT) LIKE :${param}`);
                orConditions.push(`CAST(condicion.estado AS TEXT) LIKE :${param}`);
                orConditions.push(`cliente.nombre_empresa LIKE :${param}`);
                orConditions.push(`cliente.cuit LIKE :${param}`);
                orConditions.push(`cliente.direccion LIKE :${param}`);
            });
            queryBuilder.where('(' + orConditions.join(' OR ') + ')', parameters);
        }
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [contractualConditions, total] = await queryBuilder.getManyAndCount();
        return {
            items: contractualConditions,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getContractualConditionById(contractualConditionId) {
        const contractualCondition = await this.contractualConditionsRepository.findOne({
            where: { condicionContractualId: contractualConditionId },
            relations: ['cliente'],
        });
        if (!contractualCondition) {
            throw new common_1.NotFoundException(`Ocurrió un error, Condición Contractual con ID: ${contractualConditionId} no encontrada`);
        }
        return contractualCondition;
    }
    async getContractualConditionsByClient(clientId, page = 1, limit = 10, search) {
        const client = await this.clientRepository.findOne({
            where: { clienteId: clientId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Cliente con ID: ${clientId} no encontrado`);
        }
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Parámetros de paginación inválidos.');
        }
        const queryBuilder = this.contractualConditionsRepository
            .createQueryBuilder('condicion')
            .leftJoinAndSelect('condicion.cliente', 'cliente')
            .where('cliente.clienteId = :clientId', { clientId });
        if (search) {
            const words = search.trim().split(/\s+/);
            const orConditions = [];
            const parameters = {};
            words.forEach((word, idx) => {
                const param = `search${idx}`;
                parameters[param] = `%${word}%`;
                orConditions.push(`condicion.condiciones_especificas LIKE :${param}`);
                orConditions.push(`CAST(condicion.tipo_servicio AS TEXT) LIKE :${param}`);
                orConditions.push(`cliente.nombre LIKE :${param}`);
            });
            queryBuilder.andWhere('(' + orConditions.join(' OR ') + ')', parameters);
        }
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [items, total] = await queryBuilder.getManyAndCount();
        if (!items || items.length === 0) {
            throw new common_1.NotFoundException(`El cliente con ID: ${clientId} no tiene Condiciones Contractuales`);
        }
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async createContractualCondition(createContractualConditionDto) {
        const { clientId, fecha_inicio, fecha_fin, condiciones_especificas, tarifa, periodicidad, estado, tipo_servicio, cantidad_banos, tarifa_alquiler, tarifa_instalacion, tarifa_limpieza, } = createContractualConditionDto;
        if (fecha_inicio >= fecha_fin) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
        }
        const client = await this.clientRepository.findOne({
            where: { clienteId: clientId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Cliente con ID: ${clientId} no encontrado`);
        }
        const newContractualCondition = this.contractualConditionsRepository.create({
            cliente: client,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            condiciones_especificas: condiciones_especificas,
            tarifa: tarifa,
            periodicidad: periodicidad,
            estado: estado || contractual_conditions_entity_1.EstadoContrato.ACTIVO,
            tipo_servicio: tipo_servicio,
            cantidad_banos: cantidad_banos,
            tarifa_alquiler: tarifa_alquiler,
            tarifa_instalacion: tarifa_instalacion,
            tarifa_limpieza: tarifa_limpieza,
        });
        return await this.contractualConditionsRepository.save(newContractualCondition);
    }
    async modifyContractualCondition(modifyContractualConditionDto, id) {
        const contractualCondition = await this.contractualConditionsRepository.findOne({
            where: { condicionContractualId: id },
        });
        if (!contractualCondition) {
            throw new common_1.NotFoundException(`Condición Contractual con ID: ${id} no encontrada`);
        }
        const fechaInicio = modifyContractualConditionDto.fecha_inicio ||
            contractualCondition.fecha_inicio;
        const fechaFin = modifyContractualConditionDto.fecha_fin || contractualCondition.fecha_fin;
        if (fechaInicio >= fechaFin) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
        }
        await this.contractualConditionsRepository.update(id, modifyContractualConditionDto);
        const updatedContractualCondition = await this.contractualConditionsRepository.findOne({
            where: { condicionContractualId: id },
        });
        return updatedContractualCondition;
    }
    async deleteContractualCondition(id) {
        const contractualCondition = await this.contractualConditionsRepository.findOne({
            where: { condicionContractualId: id },
        });
        if (!contractualCondition) {
            throw new common_1.NotFoundException(`Condición Contractual con ID: ${id} no encontrada`);
        }
        await this.contractualConditionsRepository.delete(id);
        return `Condición Contractual con ID ${id} ha sido eliminada`;
    }
};
exports.ContractualConditionsService = ContractualConditionsService;
exports.ContractualConditionsService = ContractualConditionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contractual_conditions_entity_1.CondicionesContractuales)),
    __param(1, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ContractualConditionsService);
//# sourceMappingURL=contractual_conditions.service.js.map