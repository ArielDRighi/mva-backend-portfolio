import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Licencias } from '../employees/entities/license.entity';
interface MailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
}
interface TaskDetails {
    client: string;
    vehicle: string;
    serviceType: string;
    toilets: string[];
    taskDate: string;
    employees?: string;
    serviceId?: number;
}
export declare class MailerService {
    private readonly userRepository;
    private transporter;
    constructor(userRepository: Repository<User>);
    sendMail(mailOptions: MailOptions): Promise<void>;
    generateEmailContent(title: string, body: string): string;
    sendRoute(email: string, name: string, vehicle: string, toilets: string[], clients: string[], serviceType: string, taskDate: string, serviceId?: number, assignedEmployees?: {
        name: string;
        rol?: string | null;
    }[], clientAddress?: string, serviceStartDate?: string): Promise<void>;
    sendRouteModified(email: string, name: string, vehicle: string, toilets: string[], clients: string[], serviceType: string, taskDate: string, clientAddress?: string, serviceStartDate?: string): Promise<void>;
    sendInProgressNotification(adminsEmails: string[], supervisorsEmails: string[], employeeName: string, taskDetails: TaskDetails): Promise<void>;
    sendCompletionNotification(adminsEmails: string[], supervisorsEmails: string[], employeeName: string, taskDetails: TaskDetails): Promise<void>;
    sendClaimNotification(adminsEmails: string[], supervisorsEmails: string[], clientName: string, claimTitle: string, claimDescription: string, claimType: string, claimDate: string): Promise<void>;
    getAdminEmails(): Promise<string[]>;
    getSupervisorEmails(): Promise<string[]>;
    sendSurveyNotification(adminsEmails: string[], supervisorsEmails: string[], clientName: string, maintenanceDate: Date | null, surveyRating: number, surveyComments: string, surveyAsunto: string, evaluatedAspects: string): Promise<void>;
    sendServiceNotification(adminsEmails: string[], supervisorsEmails: string[], nombrePersona: string, rolPersona: string, email: string, telefono: string, nombreEmpresa: string, cuit: string, rubroEmpresa: string, zonaDireccion: string, cantidadBaños: string, tipoEvento: string, duracionAlquiler: string, comentarios: string): Promise<void>;
    sendPasswordResetEmail(email: string, name: string, password: string): Promise<void>;
    sendPasswordChangeConfirmationEmail(email: string, name: string, password: string): Promise<void>;
    sendSalaryAdvanceRequestToAdmins(data: any): Promise<void>;
    sendSalaryAdvanceResponseToEmployee(data: any): Promise<void>;
    sendExpiringLicenseAlert(adminsEmails: string[], supervisorsEmails: string[], licenses: Licencias[]): Promise<void>;
}
export {};
