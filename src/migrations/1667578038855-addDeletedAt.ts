import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDeletedAt1667578038855 implements MigrationInterface {
  name = 'addDeletedAt1667578038855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
  }
}
