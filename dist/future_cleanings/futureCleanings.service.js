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
exports.FutureCleaningsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const futureCleanings_entity_1 = require("./entities/futureCleanings.entity");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../clients/entities/client.entity");
const service_entity_1 = require("../services/entities/service.entity");
let FutureCleaningsService = class FutureCleaningsService {
    constructor(futurasLimpiezasRepository, clientRepository, serviceRepository) {
        this.futurasLimpiezasRepository = futurasLimpiezasRepository;
        this.clientRepository = clientRepository;
        this.serviceRepository = serviceRepository;
    }
    async getAll(paginationDto) {
        const { page = 1, limit = 5 } = paginationDto;
        const query = this.futurasLimpiezasRepository
            .createQueryBuilder('futurasLimpiezas')
            .leftJoinAndSelect('futurasLimpiezas.cliente', 'cliente')
            .leftJoinAndSelect('futurasLimpiezas.servicio', 'servicio')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await query.getManyAndCount();
        if (items.length === 0) {
            throw new common_1.BadRequestException('No se encontraron limpiezas futuras');
        }
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getById(id) {
        const futureCleaning = await this.futurasLimpiezasRepository.findOne({
            where: { id: id },
            relations: ['cliente', 'servicio'],
        });
        if (!futureCleaning) {
            throw new common_1.BadRequestException('Limpieza futura no encontrada');
        }
        return futureCleaning;
    }
    async deleteFutureCleaning(id) {
        const futureCleaning = await this.futurasLimpiezasRepository.findOne({
            where: { id: id },
        });
        if (!futureCleaning) {
            throw new common_1.BadRequestException('Limpieza futura no encontrada');
        }
        await this.futurasLimpiezasRepository.delete(id);
        return { message: 'Limpieza futura eliminada exitosamente' };
    }
    async updateFutureCleaning(id, data) {
        const futureCleaning = await this.futurasLimpiezasRepository.findOne({
            where: { id: id },
        });
        if (!futureCleaning) {
            throw new common_1.BadRequestException('Limpieza futura no encontrada');
        }
        await this.futurasLimpiezasRepository.update(id, {
            isActive: data.isActive,
        });
        return { message: 'Limpieza futura actualizada exitosamente' };
    }
    async createFutureCleaning(data) {
        const cliente = await this.clientRepository.findOne({
            where: { clienteId: data.clientId },
        });
        if (!cliente) {
            throw new common_1.BadRequestException('Cliente no encontrado');
        }
        const service = await this.serviceRepository.findOne({
            where: { id: data.servicioId },
        });
        if (!service) {
            throw new common_1.BadRequestException('Servicio no encontrado');
        }
        const existingCleanings = await this.futurasLimpiezasRepository.count({
            where: { servicio: { id: data.servicioId } },
        });
        const numeroLimpieza = existingCleanings + 1;
        try {
            const futureCleaning = this.futurasLimpiezasRepository.create({
                cliente: cliente,
                fecha_de_limpieza: data.fecha_de_limpieza,
                numero_de_limpieza: numeroLimpieza,
                isActive: data.isActive ?? true,
                servicio: service,
            });
            await this.futurasLimpiezasRepository.save(futureCleaning);
            return futureCleaning;
        }
        catch (error) {
            throw new common_1.BadRequestException(error instanceof Error ? error.message : 'Error desconocido ocurrido');
        }
    }
    async getByDateRange(startDate, endDate, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const query = this.futurasLimpiezasRepository
            .createQueryBuilder('futurasLimpiezas')
            .leftJoinAndSelect('futurasLimpiezas.cliente', 'cliente')
            .leftJoinAndSelect('futurasLimpiezas.servicio', 'servicio')
            .where('futurasLimpiezas.fecha_de_limpieza >= :startDate', { startDate })
            .andWhere('futurasLimpiezas.fecha_de_limpieza <= :endDate', { endDate })
            .orderBy('futurasLimpiezas.fecha_de_limpieza', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await query.getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUpcomingCleanings(days, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        const query = this.futurasLimpiezasRepository
            .createQueryBuilder('futurasLimpiezas')
            .leftJoinAndSelect('futurasLimpiezas.cliente', 'cliente')
            .leftJoinAndSelect('futurasLimpiezas.servicio', 'servicio')
            .where('futurasLimpiezas.fecha_de_limpieza >= :today', { today })
            .andWhere('futurasLimpiezas.fecha_de_limpieza <= :futureDate', { futureDate })
            .andWhere('futurasLimpiezas.isActive = :isActive', { isActive: true })
            .orderBy('futurasLimpiezas.fecha_de_limpieza', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await query.getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            daysRange: days,
        };
    }
};
exports.FutureCleaningsService = FutureCleaningsService;
exports.FutureCleaningsService = FutureCleaningsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(futureCleanings_entity_1.FuturasLimpiezas)),
    __param(1, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __param(2, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FutureCleaningsService);
//# sourceMappingURL=futureCleanings.service.js.map