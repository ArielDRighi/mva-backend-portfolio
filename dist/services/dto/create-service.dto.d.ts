import { ServiceState, ServiceType } from '../../common/enums/resource-states.enum';
import { CreateResourceAssignmentDto } from './create-resource-assignment.dto';
export declare class CreateServiceDto {
    clienteId?: number;
    fechaProgramada: Date;
    fechaInicio?: string;
    fechaFin?: string;
    tipoServicio?: ServiceType;
    estado?: ServiceState;
    cantidadBanos?: number;
    empleadoAId?: number;
    empleadoBId?: number;
    cantidadVehiculos: number;
    ubicacion: string;
    notas?: string;
    asignacionAutomatica: boolean;
    asignacionesManual?: CreateResourceAssignmentDto[];
    banosInstalados?: number[];
    condicionContractualId?: number;
    forzar?: boolean;
    fechaFinAsignacion?: string;
}
export declare class ResourceAssignmentDto {
    rol?: 'A' | 'B';
    empleadoId?: number;
    vehiculoId?: number;
    banosIds?: number[];
    search?: string;
}
