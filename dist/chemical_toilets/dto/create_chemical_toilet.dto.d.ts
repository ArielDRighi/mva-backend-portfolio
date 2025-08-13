import { ResourceState } from '../../common/enums/resource-states.enum';
export declare class CreateChemicalToiletDto {
    codigo_interno: string;
    modelo: string;
    fecha_adquisicion: Date;
    estado: ResourceState;
}
