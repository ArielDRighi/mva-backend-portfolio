import { Repository } from 'typeorm';
import { VehicleMaintenanceRecord } from './entities/vehicle_maintenance_record.entity';
import { CreateMaintenanceDto } from './dto/create_maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update_maintenance.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class VehicleMaintenanceService {
    private maintenanceRepository;
    private vehiclesService;
    private readonly logger;
    constructor(maintenanceRepository: Repository<VehicleMaintenanceRecord>, vehiclesService: VehiclesService);
    create(createMaintenanceDto: CreateMaintenanceDto): Promise<VehicleMaintenanceRecord>;
    completeMaintenace(id: number): Promise<VehicleMaintenanceRecord>;
    hasScheduledMaintenance(vehiculoId: number, fecha: Date): Promise<boolean>;
    findAll(paginationDto: PaginationDto, search?: string): Promise<{
        data: VehicleMaintenanceRecord[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<VehicleMaintenanceRecord>;
    findByVehicle(vehiculoId: number): Promise<VehicleMaintenanceRecord[]>;
    findUpcomingMaintenances(): Promise<VehicleMaintenanceRecord[]>;
    update(id: number, updateMaintenanceDto: UpdateMaintenanceDto): Promise<VehicleMaintenanceRecord>;
    remove(id: number): Promise<void>;
}
export declare class MaintenanceSchedulerService {
    private vehicleMaintenanceRepository;
    private vehiclesService;
    constructor(vehicleMaintenanceRepository: Repository<VehicleMaintenanceRecord>, vehiclesService: VehiclesService);
    handleScheduledMaintenances(): Promise<void>;
}
