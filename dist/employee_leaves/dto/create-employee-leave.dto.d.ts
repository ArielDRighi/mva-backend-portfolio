import { LeaveType } from '../entities/employee-leave.entity';
export declare class CreateEmployeeLeaveDto {
    employeeId: number;
    fechaInicio: Date;
    fechaFin: Date;
    tipoLicencia: LeaveType;
    notas?: string;
    status?: string;
}
