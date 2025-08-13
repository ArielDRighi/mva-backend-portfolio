export declare class User {
}
export declare class SalaryAdvance {
}
export declare class RopaTalles {
}
export declare class ContactosEmergencia {
}
export declare class Licencias {
}
export declare class ExamenPreocupacional {
}
export declare class EmployeeLeave {
}
export declare class Empleado {
    id: number;
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    email: string;
    direccion: string;
    fecha_nacimiento: Date;
    fecha_contratacion: Date;
    cargo: string;
    estado: string;
    numero_legajo: number;
    cuil: string;
    cbu: string;
    emergencyContacts: ContactosEmergencia[];
    licencia: Licencias;
    usuario: User;
    diasVacacionesTotal: number;
    diasVacacionesRestantes: number;
    diasVacacionesUsados: number;
    leaves: EmployeeLeave[];
    advances: SalaryAdvance[];
    talleRopa: RopaTalles;
    examenesPreocupacionales: ExamenPreocupacional[];
}
