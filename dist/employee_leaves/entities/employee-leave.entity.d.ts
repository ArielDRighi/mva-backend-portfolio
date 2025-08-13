import { Empleado } from '../../employees/entities/employee.entity';
export declare enum LeaveType {
    ENFERMEDAD = "ENFERMEDAD",
    FALLECIMIENTO_FAMILIAR = "FALLECIMIENTO_FAMILIAR",
    CASAMIENTO = "CASAMIENTO",
    NACIMIENTO = "NACIMIENTO",
    VACACIONES = "VACACIONES"
}
export declare class EmployeeLeave {
    id: number;
    employee: Empleado;
    employeeId: number;
    fechaInicio: Date;
    fechaFin: Date;
    tipoLicencia: LeaveType;
    notas: string;
    comentarioRechazo?: string;
    aprobado: boolean | null;
}
