import { Empleado } from './employee.entity';
export declare class ExamenPreocupacional {
    examen_preocupacional_id: number;
    fecha_examen: Date;
    resultado: string;
    observaciones: string;
    realizado_por: string;
    empleado: Empleado;
}
