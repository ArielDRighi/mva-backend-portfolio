import { ChemicalToilet } from '../../chemical_toilets/entities/chemical_toilet.entity';
import { Empleado } from '../../employees/entities/employee.entity';
export declare class ToiletMaintenance {
    mantenimiento_id: number;
    fecha_mantenimiento: Date;
    tipo_mantenimiento: string;
    descripcion: string;
    createdAt: Date;
    tecnicoResponsable: Empleado;
    costo: number;
    toilet: ChemicalToilet;
    completado: boolean;
    fechaCompletado: Date;
}
