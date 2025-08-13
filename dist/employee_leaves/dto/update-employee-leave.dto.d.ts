import { LeaveType } from '../entities/employee-leave.entity';
export declare class UpdateEmployeeLeaveDto {
    employeeId?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    tipoLicencia?: LeaveType;
    notas?: string;
    aprobado?: boolean;
    comentarioRechazo?: string;
}
