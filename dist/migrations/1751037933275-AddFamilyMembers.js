"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFamilyMembers1751037933275 = void 0;
class AddFamilyMembers1751037933275 {
    constructor() {
        this.name = 'AddFamilyMembers1751037933275';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "family_members" (
                "id" SERIAL NOT NULL,
                "nombre" character varying(100) NOT NULL,
                "apellido" character varying(100) NOT NULL,
                "parentesco" character varying(50) NOT NULL,
                "dni" character varying(20) NOT NULL,
                "fecha_nacimiento" date NOT NULL,
                "empleado_id" integer,
                CONSTRAINT "PK_family_members_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "family_members" 
            ADD CONSTRAINT "FK_family_members_empleado" 
            FOREIGN KEY ("empleado_id") 
            REFERENCES "employees"("empleado_id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_family_members_empleado" 
            ON "family_members" ("empleado_id")
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_family_members_empleado"`);
        await queryRunner.query(`ALTER TABLE "family_members" DROP CONSTRAINT "FK_family_members_empleado"`);
        await queryRunner.query(`DROP TABLE "family_members"`);
    }
}
exports.AddFamilyMembers1751037933275 = AddFamilyMembers1751037933275;
//# sourceMappingURL=1751037933275-AddFamilyMembers.js.map