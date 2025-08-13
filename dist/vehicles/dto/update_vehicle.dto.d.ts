import { TipoCabina } from '../entities/vehicle.entity';
export declare class UpdateVehicleDto {
    placa?: string;
    marca?: string;
    modelo?: string;
    anio?: number;
    numeroInterno?: string;
    tipoCabina?: TipoCabina;
    fechaVencimientoVTV?: string;
    fechaVencimientoSeguro?: string;
    esExterno?: boolean;
    estado?: string;
}
