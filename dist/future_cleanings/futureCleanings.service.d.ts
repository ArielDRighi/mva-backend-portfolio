import { FuturasLimpiezas } from './entities/futureCleanings.entity';
import { Repository } from 'typeorm';
import { ModifyFutureCleaningDto } from './dto/modifyFutureCleanings.dto';
import { CreateFutureCleaningDto } from './dto/createFutureCleanings.dto';
import { Cliente } from '../clients/entities/client.entity';
import { Service } from '../services/entities/service.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class FutureCleaningsService {
    private readonly futurasLimpiezasRepository;
    private readonly clientRepository;
    private readonly serviceRepository;
    constructor(futurasLimpiezasRepository: Repository<FuturasLimpiezas>, clientRepository: Repository<Cliente>, serviceRepository: Repository<Service>);
    getAll(paginationDto: PaginationDto): Promise<{
        items: FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getById(id: number): Promise<FuturasLimpiezas>;
    deleteFutureCleaning(id: number): Promise<{
        message: string;
    }>;
    updateFutureCleaning(id: number, data: ModifyFutureCleaningDto): Promise<{
        message: string;
    }>;
    createFutureCleaning(data: CreateFutureCleaningDto): Promise<FuturasLimpiezas>;
    getByDateRange(startDate: Date, endDate: Date, paginationDto: PaginationDto): Promise<{
        items: FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUpcomingCleanings(days: number, paginationDto: PaginationDto): Promise<{
        items: FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        daysRange: number;
    }>;
}
