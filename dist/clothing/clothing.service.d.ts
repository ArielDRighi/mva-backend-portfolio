import { CreateRopaTallesDto } from './dto/CreateRopaTalles.dto';
import { RopaTalles } from './entities/clothing.entity';
import { Repository } from 'typeorm';
import { Empleado } from '../employees/entities/employee.entity';
import { UpdateRopaTallesDto } from './dto/updateRopaTalles.dto';
import { Response } from 'express';
export declare class ClothingService {
    private readonly tallesRepository;
    private readonly empleadoRepository;
    constructor(tallesRepository: Repository<RopaTalles>, empleadoRepository: Repository<Empleado>);
    createClothingSpecs(talles: CreateRopaTallesDto, empleadoId: number): Promise<RopaTalles>;
    getClothingSpecs(empleadoId: number): Promise<RopaTalles>;
    getAllClothingSpecs(page?: number, limit?: number, search?: string): Promise<{
        data: RopaTalles[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    updateClothingSpecs(talles: UpdateRopaTallesDto, empleadoId: number): Promise<RopaTalles>;
    deleteClothingSpecs(empleadoId: number): Promise<{
        message: string;
    }>;
    exportToExcel(res: Response): Promise<void>;
}
