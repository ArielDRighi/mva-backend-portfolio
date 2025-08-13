import { Cliente } from '../../clients/entities/client.entity';
import { ServiceState, ServiceType } from '../../common/enums/resource-states.enum';
import { ResourceAssignment } from './resource-assignment.entity';
import { FuturasLimpiezas } from '../../future_cleanings/entities/futureCleanings.entity';
export declare class Service {
    id: number;
    clienteId: number;
    cliente: Cliente;
    fechaProgramada: Date;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    tipoServicio: ServiceType;
    estado: ServiceState;
    cantidadBanos: number;
    cantidadEmpleados: number;
    cantidadVehiculos: number;
    ubicacion: string;
    notas: string;
    asignacionAutomatica: boolean;
    banosInstalados: number[];
    condicionContractualId: number;
    fechaFinAsignacion: Date;
    fechaCreacion: Date;
    comentarioIncompleto: string;
    asignaciones: ResourceAssignment[];
    futurasLimpiezas: FuturasLimpiezas[];
}
