import { ModifyCondicionContractualDto } from './dto/modify_contractual_conditions.dto';
import { CreateContractualConditionDto } from './dto/create_contractual_conditions.dto';
import { ContractualConditionsService } from './contractual_conditions.service';
import { Pagination } from '../common/interfaces/paginations.interface';
import { CondicionesContractuales } from './entities/contractual_conditions.entity';
export declare class ContractualConditionsController {
    private readonly contractualConditionsService;
    constructor(contractualConditionsService: ContractualConditionsService);
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
