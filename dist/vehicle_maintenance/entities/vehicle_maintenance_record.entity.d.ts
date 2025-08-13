import { Vehicle } from '../../vehicles/entities/vehicle.entity';
export declare class VehicleMaintenanceRecord {
    id: number;
    vehiculoId: number;
    fechaMantenimiento: Date;
    tipoMantenimiento: string;
    descripcion: string;
    costo: number;
    proximoMantenimiento: Date;
    vehicle: Vehicle;
    completado: boolean;
    fechaCompletado: Date;
}
