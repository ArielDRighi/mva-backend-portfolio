import { SalaryAdvance } from './entities/salary_advance.entity';
import { CreateAdvanceDto } from './dto/create-salary_advance.dto';
export declare class SalaryAdvanceService {
    private advanceRequests;
    private employeeRepository;
    private salaryAdvanceRepository;
    createAdvance(dto: CreateAdvanceDto, user: any): Promise<SalaryAdvance>;
    getAll(status?: string | undefined, page?: number, limit?: number): Promise<{
        advances: SalaryAdvance[];
        total: number;
        page: number;
        limit: number;
    }>;
    approve(id: string, adminId: string): Promise<SalaryAdvance | null>;
    reject(id: string): Promise<SalaryAdvance | null>;
    getEmployeeAdvances(user: any): Promise<SalaryAdvance[]>;
}
