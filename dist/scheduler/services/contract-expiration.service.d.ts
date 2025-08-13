import { Repository } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { ChemicalToilet } from '../../chemical_toilets/entities/chemical_toilet.entity';
export declare class ContractExpirationService {
    private serviceRepository;
    private toiletsRepository;
    private readonly logger;
    constructor(serviceRepository: Repository<Service>, toiletsRepository: Repository<ChemicalToilet>);
    checkExpiredContracts(): Promise<void>;
}
