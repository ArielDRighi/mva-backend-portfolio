import { ClientsPortalService } from './clientsPortal.service';
import { CreateClaimDto } from './dto/createClaim.dto';
import { CreateSatisfactionSurveyDto } from './dto/createSatisfactionSurvey.dto';
import { AskForServiceDto } from './dto/askForService.dto';
export declare class ClientsPortalController {
    private readonly clientsPortalService;
    constructor(clientsPortalService: ClientsPortalService);
    getSatisfactionSurveys(): Promise<import("./entities/satisfactionSurvey.entity").SatisfactionSurvey[]>;
    getSatisfactionSurveyById(id: number): Promise<import("./entities/satisfactionSurvey.entity").SatisfactionSurvey>;
    getClaims(): Promise<import("./entities/claim.entity").Claim[]>;
    getClaimById(id: number): Promise<import("./entities/claim.entity").Claim>;
    createClaim(claimData: CreateClaimDto): Promise<import("./entities/claim.entity").Claim>;
    createSatisfactionSurvey(surveyData: CreateSatisfactionSurveyDto): Promise<import("./entities/satisfactionSurvey.entity").SatisfactionSurvey>;
    updateClaim(id: number, claimData: Partial<CreateClaimDto>): Promise<import("./entities/claim.entity").Claim>;
    updateSatisfactionSurvey(id: number, surveyData: Partial<CreateSatisfactionSurveyDto>): Promise<import("./entities/satisfactionSurvey.entity").SatisfactionSurvey>;
    askForServiceForm(formData: AskForServiceDto): Promise<{
        message: string;
        data: AskForServiceDto;
    }>;
    getStats(): Promise<{
        totalSurveys: number;
        totalClaims: number;
        surveys: import("./entities/satisfactionSurvey.entity").SatisfactionSurvey[];
        claims: import("./entities/claim.entity").Claim[];
    }>;
}
