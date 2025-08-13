import { Empleado } from '../../employees/entities/employee.entity';
export declare class SalaryAdvance {
    id: number;
    employee: Empleado;
    amount: number;
    reason: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    approvedBy: string;
    approvedAt: Date;
}
