import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { MailerService } from '../mailer.service';
export declare class MailerInterceptor implements NestInterceptor {
    private readonly mailerService;
    private readonly reflector;
    private readonly dataSource;
    constructor(mailerService: MailerService, reflector: Reflector, dataSource: DataSource);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private handleServiceCreation;
    private handleServiceModification;
    private handleServiceStatusChange;
    private handleClaimNotification;
    private handleSurveyNotification;
    private handleServiceRequest;
    private handlePasswordReset;
    private handleSalaryAdvanceRequest;
    private handleSalaryAdvanceResponse;
}
