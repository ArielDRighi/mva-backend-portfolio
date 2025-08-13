import { PrioridadReclamo, TipoReclamo } from '../entities/claim.entity';
export declare class CreateClaimDto {
    cliente: string;
    titulo: string;
    descripcion: string;
    tipoReclamo: TipoReclamo;
    prioridad: PrioridadReclamo;
    fechaIncidente: string;
    adjuntosUrls?: string[];
    esUrgente?: boolean;
    requiereCompensacion?: boolean;
    compensacionDetalles?: string;
    notasInternas?: string;
    empleadoAsignado?: string;
}
