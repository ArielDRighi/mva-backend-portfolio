import { Empleado } from './employee.entity';
export declare class Licencias {
    licencia_id: number;
    categoria: string;
    fecha_expedicion: Date;
    fecha_vencimiento: Date;
    empleado: Empleado;
}
