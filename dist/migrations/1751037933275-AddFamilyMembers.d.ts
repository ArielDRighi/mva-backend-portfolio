import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFamilyMembers1751037933275 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
