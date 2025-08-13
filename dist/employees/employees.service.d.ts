import { Repository } from 'typeorm';
import { Empleado } from './entities/employee.entity';
import { CreateFullEmployeeDto } from './dto/create_employee.dto';
import { UpdateEmployeeDto } from './dto/update_employee.dto';
import { UpdateLicenseDto } from './dto/update_license.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Licencias } from './entities/license.entity';
import { CreateLicenseDto } from './dto/create_license.dto';
import { CreateContactEmergencyDto } from './dto/create_contact_emergency.dto';
import { ContactosEmergencia } from './entities/emergencyContacts.entity';
import { UpdateContactEmergencyDto } from './dto/update_contact_emergency.dto';
import { ExamenPreocupacional } from './entities/examenPreocupacional.entity';
import { CreateExamenPreocupacionalDto } from './dto/create_examen.dto';
import { UpdateExamenPreocupacionalDto } from './dto/modify_examen.dto';
import { DataSource } from 'typeorm';
import { Service } from '../services/entities/service.entity';
import { UsersService } from '../users/users.service';
export declare class EmployeesService {
    private employeeRepository;
    private readonly dataSource;
    private readonly licenciaRepository;
    private readonly emergencyContactRepository;
    private readonly examenPreocupacionalRepository;
    private usersService;
    private readonly logger;
    constructor(employeeRepository: Repository<Empleado>, dataSource: DataSource, licenciaRepository: Repository<Licencias>, emergencyContactRepository: Repository<ContactosEmergencia>, examenPreocupacionalRepository: Repository<ExamenPreocupacional>, usersService: UsersService);
    create(createEmployeeDto: CreateFullEmployeeDto): Promise<Empleado>;
    findAll(paginationDto: PaginationDto): Promise<any>;
    findOne(id: number): Promise<Empleado>;
    findByDocumento(documento: string): Promise<Empleado>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Empleado>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changeStatus(id: number, estado: string): Promise<Empleado>;
    findByCargo(cargo: string): Promise<Empleado[]>;
    createLicencia(createLicenseDto: CreateLicenseDto, empleadoId: number): Promise<Licencias>;
    findLicenciasByEmpleadoId(empleadoId: number): Promise<Licencias>;
    createEmergencyContact(createEmergencyContactDto: CreateContactEmergencyDto, empleadoId: number): Promise<ContactosEmergencia>;
    findLicencias(days?: number, page?: number, limit?: number, search?: string): Promise<{
        data: Licencias[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    findEmergencyContactsByEmpleadoId(empleadoId: number): Promise<ContactosEmergencia[]>;
    updateEmergencyContact(contactoId: number, updateEmergencyContactDto: UpdateContactEmergencyDto): Promise<ContactosEmergencia>;
    removeEmergencyContact(contactoId: number): Promise<{
        message: string;
    }>;
    updateLicencia(empleadoId: number, updateLicenseDto: UpdateLicenseDto): Promise<Licencias>;
    removeLicencia(licenciaId: number): Promise<{
        message: string;
    }>;
    findLicensesToExpire(days?: number, page?: number, limit?: number): Promise<{
        data: Licencias[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    findExamenesByEmpleadoId(empleadoId: number): Promise<ExamenPreocupacional[]>;
    findProximosServiciosPorEmpleadoId(empleadoId: number): Promise<Service[]>;
    createExamenPreocupacional(createExamenPreocupacionalDto: CreateExamenPreocupacionalDto): Promise<ExamenPreocupacional>;
    removeExamenPreocupacional(examenId: number): Promise<{
        message: string;
    }>;
    updateExamenPreocupacional(examenId: number, updateExamenPreocupacionalDto: UpdateExamenPreocupacionalDto): Promise<ExamenPreocupacional>;
    getTotalEmployees(): Promise<{
        total: number;
        totalDisponibles: number;
        totalInactivos: number;
    }>;
    findByEmail(email: string): Promise<Empleado>;
}
