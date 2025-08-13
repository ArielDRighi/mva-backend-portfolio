import { VehicleMaintenanceService } from './vehicle_maintenance.service';
import { CreateMaintenanceDto } from './dto/create_maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update_maintenance.dto';
import { VehicleMaintenanceRecord } from './entities/vehicle_maintenance_record.entity';
export declare class VehicleMaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: VehicleMaintenanceService);
    create(createMaintenanceDto: CreateMaintenanceDto): Promise<VehicleMaintenanceRecord>;
    findAll(page?: string, limit?: string, search?: string): Promise<{
        data: VehicleMaintenanceRecord[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findUpcoming(): Promise<VehicleMaintenanceRecord[]>;
    findOne(id: number): Promise<VehicleMaintenanceRecord>;
    findByVehicle(vehiculoId: number): Promise<VehicleMaintenanceRecord[]>;
    update(id: number, updateMaintenanceDto: UpdateMaintenanceDto): Promise<VehicleMaintenanceRecord>;
    remove(id: number): Promise<void>;
    completeMaintenace(id: number): Promise<VehicleMaintenanceRecord>;
}
