import { SatisfactionSurvey } from './entities/satisfactionSurvey.entity';
import { Repository } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { CreateClaimDto } from './dto/createClaim.dto';
import { CreateSatisfactionSurveyDto } from './dto/createSatisfactionSurvey.dto';
import { AskForServiceDto } from './dto/askForService.dto';
export declare class ClientsPortalService {
    private readonly satisfactionSurveyRepository;
    private readonly claimRepository;
    constructor(satisfactionSurveyRepository: Repository<SatisfactionSurvey>, claimRepository: Repository<Claim>);
    getSatisfactionSurveys(): Promise<SatisfactionSurvey[]>;
    getSatisfactionSurveyById(id: number): Promise<SatisfactionSurvey>;
    getClaims(): Promise<Claim[]>;
    getClaimById(id: number): Promise<Claim>;
    createClaim(claimData: CreateClaimDto): Promise<Claim>;
    createSatisfactionSurvey(surveyData: CreateSatisfactionSurveyDto): Promise<SatisfactionSurvey>;
    updateClaim(id: number, claimData: Partial<CreateClaimDto>): Promise<Claim>;
    updateSatisfactionSurvey(id: number, surveyData: Partial<CreateSatisfactionSurveyDto>): Promise<SatisfactionSurvey>;
    askForService(formData: AskForServiceDto): {
        message: string;
        data: AskForServiceDto;
    };
    getStats(): Promise<{
        totalSurveys: number;
        totalClaims: number;
        surveys: SatisfactionSurvey[];
        claims: Claim[];
    }>;
}
