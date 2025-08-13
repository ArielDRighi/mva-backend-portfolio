import { ToiletMaintenanceService } from './toilet_maintenance.service';
import { CreateToiletMaintenanceDto } from './dto/create_toilet_maintenance.dto';
import { UpdateToiletMaintenanceDto } from './dto/update_toilet_maintenance.dto';
import { ToiletMaintenance } from './entities/toilet_maintenance.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ToiletMaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: ToiletMaintenanceService);
    create(createMaintenanceDto: CreateToiletMaintenanceDto): Promise<ToiletMaintenance>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ToiletMaintenance[];
        total: number;
        page: number;
        limit: number;
    }>;
    getMaintenanceStats(toiletId: number): Promise<any>;
    getUpcomingMaintenances(): Promise<ToiletMaintenance[]>;
    findById(maintenanceId: number): Promise<ToiletMaintenance>;
    update(maintenanceId: number, updateMaintenanceDto: UpdateToiletMaintenanceDto): Promise<ToiletMaintenance>;
    delete(maintenanceId: number): Promise<void>;
    completeMaintenace(maintenanceId: number): Promise<ToiletMaintenance>;
}
