import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusUniqueConstraint1669283372152
  implements MigrationInterface
{
  name = 'addStatusUniqueConstraint1669283372152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "UQ_b635c43f5d42d7137de3cadf5c8" UNIQUE ("title", "boardId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "UQ_b635c43f5d42d7137de3cadf5c8"`,
    );
  }
}
