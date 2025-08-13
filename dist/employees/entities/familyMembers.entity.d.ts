import { Empleado } from './employee.entity';
export declare class FamilyMember {
    id: number;
    nombre: string;
    apellido: string;
    parentesco: string;
    dni: string;
    fecha_nacimiento: Date;
    empleado: Empleado;
}
