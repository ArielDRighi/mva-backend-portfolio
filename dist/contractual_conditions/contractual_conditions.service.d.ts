import { CondicionesContractuales } from './entities/contractual_conditions.entity';
import { Repository } from 'typeorm';
import { CreateContractualConditionDto } from './dto/create_contractual_conditions.dto';
import { ModifyCondicionContractualDto } from './dto/modify_contractual_conditions.dto';
import { Cliente } from '../clients/entities/client.entity';
import { Pagination } from '../common/interfaces/paginations.interface';
export declare class ContractualConditionsService {
    private contractualConditionsRepository;
    private clientRepository;
    constructor(contractualConditionsRepository: Repository<CondicionesContractuales>, clientRepository: Repository<Cliente>);
    getAllContractualConditions(page?: number, limit?: number, search?: string): Promise<Pagination<CondicionesContractuales>>;
    getContractualConditionById(contractualConditionId: number): Promise<CondicionesContractuales>;
    getContractualConditionsByClient(clientId: number, page?: number, limit?: number, search?: string): Promise<{
        items: CondicionesContractuales[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createContractualCondition(createContractualConditionDto: CreateContractualConditionDto): Promise<CondicionesContractuales>;
    modifyContractualCondition(modifyContractualConditionDto: ModifyCondicionContractualDto, id: number): Promise<CondicionesContractuales>;
    deleteContractualCondition(id: number): Promise<string>;
}
