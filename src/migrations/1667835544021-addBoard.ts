import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBoard1667835544021 implements MigrationInterface {
  name = 'addBoard1667835544021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_boards_board" ("userId" integer NOT NULL, "boardId" integer NOT NULL, CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0" PRIMARY KEY ("userId", "boardId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d92c98138733350c58be167b78" ON "user_boards_board" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec241c244980d39996b501f397" ON "user_boards_board" ("boardId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_d92c98138733350c58be167b78c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_ec241c244980d39996b501f3970" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_ec241c244980d39996b501f3970"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_d92c98138733350c58be167b78c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ec241c244980d39996b501f397"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d92c98138733350c58be167b78"`,
    );
    await queryRunner.query(`DROP TABLE "user_boards_board"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }
}
