import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatus1667838417836 implements MigrationInterface {
  name = 'addStatus1667838417836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
