import { Service } from './service.entity';
import { Empleado } from '../../employees/entities/employee.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ChemicalToilet } from '../../chemical_toilets/entities/chemical_toilet.entity';
export declare class ResourceAssignment {
    id: number;
    servicioId: number;
    servicio: Service;
    empleadoId: number | null;
    empleado: Empleado | null;
    rolEmpleado: 'A' | 'B' | null;
    vehiculoId: number | null;
    vehiculo: Vehicle | null;
    banoId: number | null;
    bano: ChemicalToilet | null;
    fechaAsignacion: Date;
    getTipoRecurso(): 'empleado' | 'vehiculo' | 'bano' | 'mixto';
}
