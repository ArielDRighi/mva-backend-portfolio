import { ServiceState, ServiceType } from '../../common/enums/resource-states.enum';
export declare class FilterServicesDto {
    search?: string;
    estado?: ServiceState;
    tipoServicio?: ServiceType;
    clienteId?: number;
    fechaDesde?: string;
    fechaHasta?: string;
}
