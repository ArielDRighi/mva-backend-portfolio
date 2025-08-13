import { Repository } from 'typeorm';
import { EmployeeLeave } from '../../employee_leaves/entities/employee-leave.entity';
import { EmployeesService } from '../../employees/employees.service';
export declare class EmployeeLeaveSchedulerService {
    private leaveRepository;
    private employeesService;
    private readonly logger;
    constructor(leaveRepository: Repository<EmployeeLeave>, employeesService: EmployeesService);
    handleScheduledLeaves(): Promise<void>;
}
