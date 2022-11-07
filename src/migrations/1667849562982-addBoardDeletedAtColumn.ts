import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBoardDeletedAtColumn1667849562982
  implements MigrationInterface
{
  name = 'addBoardDeletedAtColumn1667849562982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "deletedAt"`);
  }
}
