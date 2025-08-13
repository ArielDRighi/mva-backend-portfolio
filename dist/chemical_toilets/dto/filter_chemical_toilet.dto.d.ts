import { PaginationDto } from '../../common/dto/pagination.dto';
import { ResourceState } from '../../common/enums/resource-states.enum';
export declare class FilterChemicalToiletDto extends PaginationDto {
    estado?: ResourceState;
    modelo?: string;
    fechaDesde?: string;
    fechaHasta?: string;
    codigoInterno?: string;
}
