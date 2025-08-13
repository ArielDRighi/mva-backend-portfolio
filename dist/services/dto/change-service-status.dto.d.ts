import { ServiceState } from '../../common/enums/resource-states.enum';
export declare class ChangeServiceStatusDto {
    estado: ServiceState;
    forzar?: boolean;
    comentarioIncompleto?: string;
}
