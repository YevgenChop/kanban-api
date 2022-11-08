import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserVerificationToken1667906799426
  implements MigrationInterface
{
  name = 'addUserVerificationToken1667906799426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "verificationToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "verificationToken"`,
    );
  }
}
