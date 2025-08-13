import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';
import { Cliente } from '../clients/entities/client.entity';
import { ChemicalToilet } from '../chemical_toilets/entities/chemical_toilet.entity';
import { ToiletMaintenance } from '../toilet_maintenance/entities/toilet_maintenance.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
export declare class RecentActivityService {
    private servicesRepository;
    private clientsRepository;
    private toiletsRepository;
    private maintenanceRepository;
    private vehiclesRepository;
    private readonly logger;
    constructor(servicesRepository: Repository<Service>, clientsRepository: Repository<Cliente>, toiletsRepository: Repository<ChemicalToilet>, maintenanceRepository: Repository<ToiletMaintenance>, vehiclesRepository: Repository<Vehicle>);
    getRecentActivity(): Promise<{
        latestCompletedService: Service;
        latestScheduledService: Service;
        latestClient: Cliente;
        latestToilet: ChemicalToilet;
        latestMaintenance: ToiletMaintenance;
        latestVehicle: Vehicle;
        timestamp: Date;
    }>;
    private getLatestCompletedService;
    private getLatestScheduledService;
    private getLatestClient;
    private getLatestToilet;
    private getLatestMaintenance;
    private getLatestVehicle;
}
