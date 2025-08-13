import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create_vehicle.dto';
import { UpdateVehicleDto } from './dto/update_vehicle.dto';
import { ResourceState } from '../common/enums/resource-states.enum';
export declare class VehiclesService {
    private vehicleRepository;
    private readonly logger;
    constructor(vehicleRepository: Repository<Vehicle>);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(page?: number, limit?: number, search?: string): Promise<any>;
    findOne(id: number): Promise<Vehicle>;
    findByPlaca(placa: string): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changeStatus(id: number, estado: string): Promise<Vehicle>;
    findByEstado(estado: ResourceState): Promise<Vehicle[]>;
    getTotalVehicles(): Promise<{
        total: number;
        totalDisponibles: number;
        totalMantenimiento: number;
        totalAsignado: number;
    }>;
    getExpiringDocuments(days?: number, page?: number, limit?: number): Promise<{
        segurosProximosAVencer: {
            data: Vehicle[];
            totalItems: number;
            currentPage: number;
            totalPages: number;
        };
        vtvProximosAVencer: {
            data: Vehicle[];
            totalItems: number;
            currentPage: number;
            totalPages: number;
        };
    }>;
}
