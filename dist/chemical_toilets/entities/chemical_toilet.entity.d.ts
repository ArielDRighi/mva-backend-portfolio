import { ResourceState } from '../../common/enums/resource-states.enum';
import { ToiletMaintenance } from '../../toilet_maintenance/entities/toilet_maintenance.entity';
export declare class ChemicalToilet {
    baño_id: number;
    codigo_interno: string;
    modelo: string;
    fecha_adquisicion: Date;
    estado: ResourceState;
    maintenances: ToiletMaintenance[];
}
