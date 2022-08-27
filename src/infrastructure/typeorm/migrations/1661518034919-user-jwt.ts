import { MigrationInterface, QueryRunner } from "typeorm";

export class userJwt1661518034919 implements MigrationInterface {
    name = 'userJwt1661518034919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "accessToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "UQ_30c2f3bbaf6d34a55f8ae6e4614" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_2cbbe00f59ab6b3bb5b8d19f989" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_2cbbe00f59ab6b3bb5b8d19f989"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_30c2f3bbaf6d34a55f8ae6e4614"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accessToken"`);
    }

}
