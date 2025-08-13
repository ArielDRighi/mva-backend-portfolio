export declare function addSignature(content: string): string;
export declare const sendRoute: (email: string, name: string, vehicle: string, toilets: string[], clients: string[], serviceType: string, taskDate: string) => Promise<void>;
export declare const sendRouteModified: (email: string, name: string, vehicle: string, toilets: string[], clients: string[], serviceType: string, taskDate: string) => Promise<void>;
export declare const sendInProgressNotification: (adminsEmails: string[], supervisorsEmails: string[], employeeName: string, taskDetails: {
    client: string;
    vehicle: string;
    serviceType: string;
    toilets: string[];
    taskDate: string;
}) => Promise<void>;
export declare const sendCompletionNotification: (adminsEmails: string[], supervisorsEmails: string[], employeeName: string, taskDetails: any) => Promise<void>;
export declare const sendClaimNotification: (adminsEmails: string[], supervisorsEmails: string[], clientName: string, claimTitle: string, claimDescription: string, claimType: string, claimDate: string) => Promise<void>;
export declare const sendSurveyNotification: (adminsEmails: string[], supervisorsEmails: string[], clientName: string, maintenanceDate: Date, surveyRating: number, surveyComments: string, surveyAsunto: string, evaluatedAspects: string) => Promise<void>;
export declare const sendServiceNotification: (adminsEmails: string[], supervisorsEmails: string[], nombrePersona: string, rolPersona: string, email: string, telefono: string, nombreEmpresa: string, cuit: string, rubroEmpresa: string, zonaDireccion: string, cantidadBaños: string, tipoEvento: string, duracionAlquiler: string, comentarios: string) => Promise<void>;
