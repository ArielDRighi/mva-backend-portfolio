import { ServiceType } from '../../../common/enums/resource-states.enum';
import { Cliente } from '../../../clients/entities/client.entity';
export declare enum Periodicidad {
    DIARIA = "Diaria",
    SEMANAL = "Semanal",
    MENSUAL = "Mensual",
    ANUAL = "Anual"
}
export declare enum EstadoContrato {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo",
    TERMINADO = "Terminado"
}
export declare class CondicionesContractuales {
    condicionContractualId: number;
    cliente: Cliente;
    fecha_inicio: Date;
    fecha_fin: Date;
    condiciones_especificas: string;
    tarifa: number;
    periodicidad: Periodicidad;
    estado: EstadoContrato;
    tipo_servicio: ServiceType;
    cantidad_banos: number;
    tarifa_alquiler: number;
    tarifa_instalacion: number;
    tarifa_limpieza: number;
}
declare const _default: {
    CondicionesContractuales: typeof CondicionesContractuales;
    Periodicidad: typeof Periodicidad;
    EstadoContrato: typeof EstadoContrato;
};
export default _default;
