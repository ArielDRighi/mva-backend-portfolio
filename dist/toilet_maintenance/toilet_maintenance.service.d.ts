import { UpdateToiletMaintenanceDto } from './dto/update_toilet_maintenance.dto';
import { ToiletMaintenance } from './entities/toilet_maintenance.entity';
import { ChemicalToilet } from '../chemical_toilets/entities/chemical_toilet.entity';
import { Empleado } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateToiletMaintenanceDto } from './dto/create_toilet_maintenance.dto';
import { ChemicalToiletsService } from '../chemical_toilets/chemical_toilets.service';
import { Periodicidad } from '../contractual_conditions/entities/contractual_conditions.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class ToiletMaintenanceService {
    private maintenanceRepository;
    private toiletsRepository;
    private empleadoRepository;
    private chemicalToiletsService;
    constructor(maintenanceRepository: Repository<ToiletMaintenance>, toiletsRepository: Repository<ChemicalToilet>, empleadoRepository: Repository<Empleado>, chemicalToiletsService: ChemicalToiletsService);
    calculateMaintenanceDays(fechaInicio: Date | null, fechaFin: Date | null, periodicidad: Periodicidad): Date[];
    create(createMaintenanceDto: CreateToiletMaintenanceDto): Promise<ToiletMaintenance>;
    completeMaintenace(id: number): Promise<ToiletMaintenance>;
    hasScheduledMaintenance(banoId: number, fecha: Date): Promise<boolean>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ToiletMaintenance[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUpcomingMaintenances(): Promise<ToiletMaintenance[]>;
    findById(mantenimiento_id: number): Promise<ToiletMaintenance>;
    update(mantenimiento_id: number, updateMaintenanceDto: UpdateToiletMaintenanceDto): Promise<ToiletMaintenance>;
    delete(mantenimiento_id: number): Promise<void>;
    getMantenimientosStats(baño_id: number): Promise<any>;
}
export declare class ToiletMaintenanceSchedulerService {
    private toiletMaintenanceRepository;
    private chemicalToiletsService;
    constructor(toiletMaintenanceRepository: Repository<ToiletMaintenance>, chemicalToiletsService: ChemicalToiletsService);
    handleScheduledMaintenances(): Promise<void>;
}
