import { CreateClientDto } from './dto/create_client.dto';
import { UpdateClientDto } from './dto/update_client.dto';
import { Cliente } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ChemicalToiletsService } from '../chemical_toilets/chemical_toilets.service';
import { CondicionesContractuales } from '../contractual_conditions/entities/contractual_conditions.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Pagination } from '../common/interfaces/paginations.interface';
export declare class ClientService {
    private clientRepository;
    private condicionesContractualesRepository;
    private chemicalToiletsService;
    private readonly logger;
    constructor(clientRepository: Repository<Cliente>, condicionesContractualesRepository: Repository<CondicionesContractuales>, chemicalToiletsService: ChemicalToiletsService);
    create(createClientDto: CreateClientDto): Promise<Cliente>;
    findAll(paginationDto: PaginationDto): Promise<Pagination<Cliente>>;
    findOneClient(clienteId: number): Promise<Cliente>;
    updateClient(clienteId: number, updateClientDto: UpdateClientDto): Promise<Cliente>;
    deleteClient(clienteId: number): Promise<void>;
    getActiveContract(clientId: number): Promise<{
        contrato: CondicionesContractuales;
        banosAsignados: import("../chemical_toilets/entities/chemical_toilet.entity").ChemicalToilet[];
    }>;
}
