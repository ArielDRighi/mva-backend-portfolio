import { ClothingService } from './clothing.service';
import { CreateRopaTallesDto } from './dto/CreateRopaTalles.dto';
import { UpdateRopaTallesDto } from './dto/updateRopaTalles.dto';
import { Response } from 'express';
import { RopaTalles } from './entities/clothing.entity';
export declare class ClothingController {
    private readonly clothingService;
    constructor(clothingService: ClothingService);
    getAllClothingSpecs(page: number, limit: number, search?: string): Promise<{
        data: RopaTalles[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    exportExcel(res: Response): Promise<void>;
    getClothingSpecs(empleadoId: number): Promise<RopaTalles>;
    create(talles: CreateRopaTallesDto, empleadoId: number): Promise<RopaTalles>;
    update(talles: UpdateRopaTallesDto, empleadoId: number): Promise<RopaTalles>;
    delete(empleadoId: number): Promise<{
        message: string;
    }>;
}
