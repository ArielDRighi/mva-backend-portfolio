import { EmployeesService } from './employees.service';
import { CreateFullEmployeeDto } from './dto/create_employee.dto';
import { UpdateEmployeeDto } from './dto/update_employee.dto';
import { Empleado } from './entities/employee.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateLicenseDto } from './dto/create_license.dto';
import { Licencias } from './entities/license.entity';
import { CreateContactEmergencyDto } from './dto/create_contact_emergency.dto';
import { ContactosEmergencia } from './entities/emergencyContacts.entity';
import { UpdateContactEmergencyDto } from './dto/update_contact_emergency.dto';
import { UpdateLicenseDto } from './dto/update_license.dto';
import { CreateExamenPreocupacionalDto } from './dto/create_examen.dto';
import { UpdateExamenPreocupacionalDto } from './dto/modify_examen.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    updateExamenPreocupacional(updateExamenPreocupacionalDto: UpdateExamenPreocupacionalDto, examenId: number): Promise<any>;
    removeExamenPreocupacional(examenId: number): Promise<{
        message: string;
    }>;
    createExamenPreocupacional(createExamenPreocupacionalDto: CreateExamenPreocupacionalDto): Promise<any>;
    findExamenesByEmpleadoId(empleadoId: number): Promise<import("./entities/examenPreocupacional.entity").ExamenPreocupacional[]>;
    createEmergencyContact(createEmergencyContactDto: CreateContactEmergencyDto, empleadoId: number): Promise<ContactosEmergencia>;
    removeEmergencyContact(contactoId: number): Promise<{
        message: string;
    }>;
    updateEmergencyContact(updateEmergencyContactDto: UpdateContactEmergencyDto, contactoId: number): Promise<ContactosEmergencia>;
    findEmergencyContactsByEmpleadoId(empleadoId: number): Promise<ContactosEmergencia[]>;
    findLicensesToExpire(dias: number, page: number, limit: number): Promise<{
        data: Licencias[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    updateLicencia(updateLicenseDto: UpdateLicenseDto, empleadoId: number): Promise<Licencias>;
    removeLicencia(licenciaId: number): Promise<{
        message: string;
    }>;
    createLicencia(createEmployeeDto: CreateLicenseDto, empleadoId: number): Promise<Licencias>;
    findLicenciasByEmpleadoId(empleadoId: number): Promise<Licencias>;
    obtenerProximosServicios(id: number): Promise<import("../services/entities/service.entity").Service[]>;
    findLicencias(dias: number, page: number, limit: number, search?: string): Promise<{
        data: Licencias[];
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }>;
    create(createEmployeeDto: CreateFullEmployeeDto): Promise<Empleado>;
    findAll(paginationDto: PaginationDto): Promise<any>;
    getTotalEmployees(): Promise<{
        total: number;
        totalDisponibles: number;
        totalInactivos: number;
    }>;
    findOne(id: number): Promise<Empleado>;
    findByDocumento(documento: string): Promise<Empleado>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Empleado>;
    remove(id: number): Promise<{
        message: string;
    }>;
    changeStatus(id: number, estado: string): Promise<Empleado>;
}
