import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLogin1667571474188 implements MigrationInterface {
  name = 'addLogin1667571474188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_52b61cb2bc64db2e4873b4a5c02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "login" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_f48b377860641fd37ea51ae55c8" UNIQUE ("name", "email", "login")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_f48b377860641fd37ea51ae55c8"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_52b61cb2bc64db2e4873b4a5c02" UNIQUE ("name", "email")`,
    );
  }
}
