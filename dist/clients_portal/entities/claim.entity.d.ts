export declare enum EstadoReclamo {
    PENDIENTE = "pending",
    EN_PROGRESO = "in_progress",
    RESUELTO = "resolved",
    CERRADO = "closed",
    RECHAZADO = "rejected"
}
export declare enum PrioridadReclamo {
    BAJA = "low",
    MEDIA = "medium",
    ALTA = "high",
    CRITICA = "critical"
}
export declare enum TipoReclamo {
    CALIDAD_SERVICIO = "service_quality",
    DEMORA = "delay",
    PAGOS = "billing",
    EMPLEADO = "staff_behavior",
    PRODUCTO_DEFECTUOSO = "product_defect",
    OTROS = "other"
}
export declare class Claim {
    reclamo_id: number;
    cliente: string;
    titulo: string;
    descripcion: string;
    tipoReclamo: TipoReclamo;
    prioridad: PrioridadReclamo;
    estado: EstadoReclamo;
    fechaCreacion: Date;
    fechaIncidente: Date;
    fechaActualiacion: Date;
    fechaResolucion: Date;
    respuesta: string;
    accionTomada: string;
    adjuntosUrls: string[];
    satisfaccionCliente: number;
    esUrgente: boolean;
    requiereCompensacion: boolean;
    compensacionDetalles: string;
    notasInternas: string;
    empleadoAsignado: string;
}
