import { Cliente } from '../../clients/entities/client.entity';
import { Service } from '../../services/entities/service.entity';
export declare class FuturasLimpiezas {
    id: number;
    cliente: Cliente;
    fecha_de_limpieza: Date;
    isActive: boolean;
    numero_de_limpieza: number;
    servicio: Service;
}
