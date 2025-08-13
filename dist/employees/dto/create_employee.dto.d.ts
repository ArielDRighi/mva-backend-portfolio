import { CreateContactEmergencyDto } from './create_contact_emergency.dto';
import { CreateLicenseDto } from './create_license.dto';
import { CreateExamenPreocupacionalDto } from './create_examen.dto';
export declare class CreateEmployeeDto {
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    email: string;
    direccion?: string;
    fecha_nacimiento?: string;
    fecha_contratacion: string;
    cargo: string;
    estado: string;
    numero_legajo: number;
    cuil: string;
    cbu: string;
}
export declare class CreateFullEmployeeDto extends CreateEmployeeDto {
    emergencyContacts?: CreateContactEmergencyDto[];
    licencia?: CreateLicenseDto;
    examenPreocupacional?: CreateExamenPreocupacionalDto;
}
