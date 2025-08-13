import { ServiceState, ServiceType } from '../../common/enums/resource-states.enum';
import { ResourceAssignmentDto } from './create-service.dto';
export declare class UpdateServiceDto {
    clienteId?: number;
    fechaProgramada?: string;
    fechaInicio?: string;
    fechaFin?: string;
    tipoServicio?: ServiceType;
    estado?: ServiceState;
    cantidadBanos?: number;
    empleadoAId?: number;
    empleadoBId?: number;
    cantidadVehiculos?: number;
    ubicacion?: string;
    notas?: string;
    asignacionAutomatica?: boolean;
    asignacionesManual?: ResourceAssignmentDto[];
    banosInstalados?: number[];
}
