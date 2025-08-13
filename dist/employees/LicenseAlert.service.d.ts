import { MailerService } from '../mailer/mailer.service';
import { Repository } from 'typeorm';
import { Licencias } from './entities/license.entity';
export declare class LicenseAlertService {
    private readonly licenciasRepository;
    private readonly mailerService;
    private readonly logger;
    constructor(licenciasRepository: Repository<Licencias>, mailerService: MailerService);
    checkExpiringLicenses(): Promise<void>;
    private sendExpiringLicenseNotifications;
}
