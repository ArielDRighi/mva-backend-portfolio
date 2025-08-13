import { FutureCleaningsService } from './futureCleanings.service';
import { ModifyFutureCleaningDto } from './dto/modifyFutureCleanings.dto';
import { CreateFutureCleaningDto } from './dto/createFutureCleanings.dto';
export declare class FutureCleaningsController {
    private readonly futureCleaningsService;
    constructor(futureCleaningsService: FutureCleaningsService);
    getAllFutureCleanings(page?: string, limit?: string): Promise<{
        items: import("./entities/futureCleanings.entity").FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    deleteFutureCleaning(id: number): Promise<{
        message: string;
    }>;
    getFutureCleaningsByDateRange(startDate: string, endDate: string, page?: string, limit?: string): Promise<{
        items: import("./entities/futureCleanings.entity").FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUpcomingCleanings(days?: string, page?: string, limit?: string): Promise<{
        items: import("./entities/futureCleanings.entity").FuturasLimpiezas[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        daysRange: number;
    }>;
    getFutureCleaningById(id: number): Promise<import("./entities/futureCleanings.entity").FuturasLimpiezas>;
    createFutureCleaning(data: CreateFutureCleaningDto): Promise<import("./entities/futureCleanings.entity").FuturasLimpiezas>;
    updateFutureCleaning(id: number, data: ModifyFutureCleaningDto): Promise<{
        message: string;
    }>;
}
