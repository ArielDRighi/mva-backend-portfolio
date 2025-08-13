import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create_vehicle.dto';
import { UpdateVehicleDto } from './dto/update_vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    getTotalVehicles(): Promise<{
        total: number;
        totalDisponibles: number;
        totalMantenimiento: number;
        totalAsignado: number;
    }>;
    getDocumentosPorVencer(dias: number, page: number, limit: number): Promise<{
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
    findAll(page: number, limit: number, search?: string): Promise<any>;
    findOne(id: number): Promise<Vehicle>;
    findByPlaca(placa: string): Promise<Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changeStatus(id: number, estado: string): Promise<Vehicle>;
}
