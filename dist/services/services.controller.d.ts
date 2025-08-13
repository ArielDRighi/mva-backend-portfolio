import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ChangeServiceStatusDto } from './dto/change-service-status.dto';
import { FilterServicesDto } from './dto/filter-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    getCapacitacionServices(page?: number, limit?: number, search?: string): Promise<{
        data: Service[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    getInstalacionServices(page?: number, limit?: number): Promise<{
        data: Service[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    getLimpiezaServices(page?: number, limit?: number): Promise<{
        data: Service[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    getLastServicesByEmployee(employeeId: number): Promise<Service[]>;
    getCompletedServicesByEmployee(employeeId: number, page?: number, limit?: number, search?: string): Promise<any>;
    getProximosServicios(): Promise<Service[]>;
    createInstalacion(dto: CreateServiceDto): Promise<Service>;
    createCapacitacion(dto: CreateServiceDto): Promise<Service>;
    createLimpieza(dto: CreateServiceDto): Promise<Service>;
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    getAssignedPendings(employeeId: number): Promise<Service[]>;
    getAssignedInProgress(employeeId: number): Promise<Service[]>;
    findAll(filterDto: FilterServicesDto, page?: number, limit?: number): Promise<any>;
    getServicesStats(): Promise<{
        totalInstalacion: number;
        totalLimpieza: number;
        totalRetiro: number;
        total: number;
    }>;
    getResumenServicios(): Promise<void>;
    findByDateRange(startDate: string, endDate: string): Promise<Service[]>;
    getRemainingWeekServices(): Promise<Service[]>;
    findToday(): Promise<Service[]>;
    findPending(): Promise<Service[]>;
    findInProgress(): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service>;
    remove(id: number): Promise<void>;
    changeStatus(id: number, statusDto: ChangeServiceStatusDto): Promise<Service>;
}
