import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create_client.dto';
import { UpdateClientDto } from './dto/update_client.dto';
import { Cliente } from './entities/client.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Pagination } from '../common/interfaces/paginations.interface';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<Cliente>;
    findAll(paginationDto: PaginationDto): Promise<Pagination<Cliente>>;
    findOne(clienteId: number): Promise<Cliente>;
    update(clienteId: number, updateClientDto: UpdateClientDto): Promise<Cliente>;
    delete(clienteId: number): Promise<void>;
    getActiveContract(clientId: number): Promise<{
        contrato: import("../contractual_conditions/entities/contractual_conditions.entity").CondicionesContractuales;
        banosAsignados: import("../chemical_toilets/entities/chemical_toilet.entity").ChemicalToilet[];
    }>;
}
