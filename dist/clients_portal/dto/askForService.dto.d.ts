declare enum BathroomQuantity {
    CHICO = "1-5",
    MEDIANO = "5-10",
    GRANDE = "+10"
}
export declare class AskForServiceDto {
    nombrePersona: string;
    rolPersona: string;
    email: string;
    telefono: string;
    nombreEmpresa: string;
    cuit: string;
    rubroEmpresa: string;
    zonaDireccion: string;
    cantidadBaños: BathroomQuantity;
    tipoEvento: string;
    duracionAlquiler: string;
    startDate?: string;
    comentarios: string;
}
export {};
