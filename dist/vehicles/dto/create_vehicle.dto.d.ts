import { TipoCabina } from '../entities/vehicle.entity';
export declare class CreateVehicleDto {
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    numeroInterno?: string;
    tipoCabina?: TipoCabina;
    fechaVencimientoVTV?: string;
    fechaVencimientoSeguro?: string;
    esExterno?: boolean;
    estado: string;
}
