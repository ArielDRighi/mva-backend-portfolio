import { Repository } from 'typeorm';
import { EmployeeLeave, LeaveType } from './entities/employee-leave.entity';
import { CreateEmployeeLeaveDto } from './dto/create-employee-leave.dto';
import { UpdateEmployeeLeaveDto } from './dto/update-employee-leave.dto';
import { EmployeesService } from '../employees/employees.service';
export declare class EmployeeLeavesService {
    private leaveRepository;
    private employeesService;
    private readonly logger;
    constructor(leaveRepository: Repository<EmployeeLeave>, employeesService: EmployeesService);
    create(createLeaveDto: CreateEmployeeLeaveDto): Promise<EmployeeLeave>;
    findAll(page?: number, limit?: number, search?: string, tipoLicencia?: LeaveType): Promise<{
        data: EmployeeLeave[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<EmployeeLeave>;
    findByEmployee(employeeId: number): Promise<EmployeeLeave[]>;
    update(id: number, updateLeaveDto: UpdateEmployeeLeaveDto): Promise<EmployeeLeave>;
    reject(id: number, comentario?: string): Promise<EmployeeLeave>;
    remove(id: number): Promise<{
        message: string;
    }>;
    isEmployeeAvailable(employeeId: number, fecha: Date): Promise<boolean>;
    getActiveLeaves(fecha: Date): Promise<EmployeeLeave[]>;
    approve(id: number): Promise<EmployeeLeave>;
}
