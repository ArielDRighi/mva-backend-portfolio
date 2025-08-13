import { ChemicalToiletsService } from './chemical_toilets.service';
import { CreateChemicalToiletDto } from './dto/create_chemical_toilet.dto';
import { UpdateChemicalToiletDto } from './dto/update_chemical.toilet.dto';
import { ChemicalToilet } from './entities/chemical_toilet.entity';
import { Pagination } from '../common/interfaces/paginations.interface';
export declare class ChemicalToiletsController {
    private readonly chemicalToiletsService;
    constructor(chemicalToiletsService: ChemicalToiletsService);
    findServicesByToilet(id: number): Promise<any[]>;
    getTotalChemicalToilets(): Promise<{
        total: number;
        totalDisponibles: number;
        totalMantenimiento: number;
        totalAsignado: number;
    }>;
    create(createChemicalToiletDto: CreateChemicalToiletDto): Promise<ChemicalToilet>;
    findAll(page?: string, limit?: string, search?: string): Promise<Pagination<ChemicalToilet>>;
    findById(id: number): Promise<ChemicalToilet>;
    update(id: number, updateChemicalToiletDto: UpdateChemicalToiletDto): Promise<ChemicalToilet>;
    remove(id: number): Promise<void>;
    getStats(id: number): Promise<any>;
    findToiletsByClient(clientId: number): Promise<ChemicalToilet[]>;
}
