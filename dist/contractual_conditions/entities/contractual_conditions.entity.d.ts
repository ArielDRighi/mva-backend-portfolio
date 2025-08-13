import { Cliente } from '../../clients/entities/client.entity';
import { ServiceType } from '../../common/enums/resource-states.enum';
export declare enum Periodicidad {
    DIARIA = "Diaria",
    DOS_VECES_SEMANA = "Dos veces por semana",
    TRES_VECES_SEMANA = "Tres veces por semana",
    CUATRO_VECES_SEMANA = "Cuatro veces por semana",
    SEMANAL = "Semanal",
    QUINCENAL = "Quincenal",
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
    tarifa_alquiler: number;
    tarifa_instalacion: number;
    tarifa_limpieza: number;
    tipo_servicio: ServiceType;
    cantidad_banos: number;
    periodicidad: Periodicidad;
    estado: EstadoContrato;
}
