import { EstadoContrato, Periodicidad } from '../entities/contractual_conditions.entity';
import { ServiceType } from '../../common/enums/resource-states.enum';
export declare class CreateContractualConditionDto {
    clientId: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    condiciones_especificas?: string;
    tarifa: number;
    tarifa_alquiler?: number;
    tarifa_instalacion?: number;
    tarifa_limpieza?: number;
    tipo_servicio?: ServiceType;
    cantidad_banos?: number;
    periodicidad: Periodicidad;
    estado?: EstadoContrato;
}
export declare function normalizeEnumValue(value: string): string;
