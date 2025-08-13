export declare enum RolEmpleado {
    A = "A",
    B = "B"
}
export declare class CreateResourceAssignmentDto {
    empleadoId?: number;
    vehiculoId?: number;
    rol?: 'A' | 'B';
    banosIds?: number[];
}
