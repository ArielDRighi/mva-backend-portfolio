import { ResourceState } from '../../common/enums/resource-states.enum';
export declare class UpdateChemicalToiletDto {
    codigo_interno?: string;
    modelo?: string;
    fecha_adquisicion?: Date;
    estado?: ResourceState;
}
