import { CreateChemicalToiletDto } from './dto/create_chemical_toilet.dto';
import { UpdateChemicalToiletDto } from './dto/update_chemical.toilet.dto';
import { FilterChemicalToiletDto } from './dto/filter_chemical_toilet.dto';
import { ChemicalToilet } from './entities/chemical_toilet.entity';
import { Repository } from 'typeorm';
import { ResourceState } from '../common/enums/resource-states.enum';
import { Service } from '../services/entities/service.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Pagination } from '../common/interfaces/paginations.interface';
export declare class ChemicalToiletsService {
    private chemicalToiletRepository;
    private serviceRepository;
    constructor(chemicalToiletRepository: Repository<ChemicalToilet>, serviceRepository: Repository<Service>);
    create(createChemicalToiletDto: CreateChemicalToiletDto): Promise<ChemicalToilet>;
    findAll(paginationDto: PaginationDto, search?: string): Promise<Pagination<ChemicalToilet>>;
    findAllWithFilters(filterDto: FilterChemicalToiletDto): Promise<Pagination<ChemicalToilet>>;
    findAllByState(estado: ResourceState, paginationDto: PaginationDto): Promise<ChemicalToilet[]>;
    findById(id: number): Promise<ChemicalToilet>;
    update(id: number, updateChemicalToiletDto: UpdateChemicalToiletDto): Promise<ChemicalToilet>;
    remove(id: number): Promise<void>;
    getMaintenanceStats(id: number): Promise<any>;
    findByClientId(clientId: number): Promise<ChemicalToilet[]>;
    findServicesByToiletId(toiletId: number): Promise<any[]>;
    getTotalChemicalToilets(): Promise<{
        total: number;
        totalDisponibles: number;
        totalMantenimiento: number;
        totalAsignado: number;
    }>;
}
