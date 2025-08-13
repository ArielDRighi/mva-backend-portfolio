import { VehicleMaintenanceRecord } from '../../vehicle_maintenance/entities/vehicle_maintenance_record.entity';
export declare enum TipoCabina {
    SIMPLE = "simple",
    DOBLE = "doble"
}
export declare class Vehicle {
    id: number;
    numeroInterno: string;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    tipoCabina: TipoCabina;
    fechaVencimientoVTV: Date;
    fechaVencimientoSeguro: Date;
    esExterno: boolean;
    estado: string;
    maintenanceRecords: VehicleMaintenanceRecord[];
}
