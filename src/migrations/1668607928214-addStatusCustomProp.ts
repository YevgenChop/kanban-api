import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusCustomProp1668607928214 implements MigrationInterface {
  name = 'addStatusCustomProp1668607928214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" ADD "custom" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "boardId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "boardId"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "custom"`);
  }
}
