import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRefreshToken1669739290318 implements MigrationInterface {
  name = 'addRefreshToken1669739290318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
