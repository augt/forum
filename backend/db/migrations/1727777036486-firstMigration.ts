import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1727777036486 implements MigrationInterface {
    name = 'FirstMigration1727777036486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "group" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "group" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedAt" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "image" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "updatedAt" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "image" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "group"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "group"`);
    }

}
