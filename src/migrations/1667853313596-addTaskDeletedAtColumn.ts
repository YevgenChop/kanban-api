import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTaskDeletedAtColumn1667853313596 implements MigrationInterface {
  name = 'addTaskDeletedAtColumn1667853313596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deletedAt"`);
  }
}
