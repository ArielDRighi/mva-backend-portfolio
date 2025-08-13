import { EmployeeLeavesService } from './employee-leaves.service';
import { CreateEmployeeLeaveDto } from './dto/create-employee-leave.dto';
import { UpdateEmployeeLeaveDto } from './dto/update-employee-leave.dto';
import { LeaveType } from './entities/employee-leave.entity';
export declare class EmployeeLeavesController {
    private readonly leavesService;
    constructor(leavesService: EmployeeLeavesService);
    create(createLeaveDto: CreateEmployeeLeaveDto): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    findAll(page: number, limit: number, search?: string, tipoLicencia?: LeaveType): Promise<{
        data: import("./entities/employee-leave.entity").EmployeeLeave[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    findByEmployee(id: string): Promise<import("./entities/employee-leave.entity").EmployeeLeave[]>;
    update(id: string, updateLeaveDto: UpdateEmployeeLeaveDto): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    approve(id: number): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    rejectLeave(id: number, comentario: string): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    reject(id: number): Promise<import("./entities/employee-leave.entity").EmployeeLeave>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
