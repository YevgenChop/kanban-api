import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueConstraint1667554145389 implements MigrationInterface {
  name = 'addUniqueConstraint1667554145389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_52b61cb2bc64db2e4873b4a5c02" UNIQUE ("name", "email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_52b61cb2bc64db2e4873b4a5c02"`,
    );
  }
}
