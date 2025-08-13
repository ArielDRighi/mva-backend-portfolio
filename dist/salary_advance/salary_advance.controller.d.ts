import { SalaryAdvanceService } from './salary_advance.service';
import { CreateAdvanceDto } from './dto/create-salary_advance.dto';
import { ApproveAdvanceDto } from './dto/approve-advance.dto';
export declare class SalaryAdvanceController {
    private readonly advanceService;
    constructor(advanceService: SalaryAdvanceService);
    create(dto: CreateAdvanceDto, req: {
        user?: any;
    }): Promise<import("./entities/salary_advance.entity").SalaryAdvance>;
    findAll(status?: string, page?: number, limit?: number): Promise<{
        advances: import("./entities/salary_advance.entity").SalaryAdvance[];
        total: number;
        page: number;
        limit: number;
    }>;
    approveOrRejectAdvance(id: string, dto: ApproveAdvanceDto, req: {
        user?: {
            userId: string;
        };
    }): Promise<import("./entities/salary_advance.entity").SalaryAdvance>;
    getEmployeeAdvances(req: {
        user?: any;
    }): Promise<import("./entities/salary_advance.entity").SalaryAdvance[]>;
}
