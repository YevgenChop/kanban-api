import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTask1667837739962 implements MigrationInterface {
  name = 'addTask1667837739962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "boardId" integer NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tasks_task" ("userId" integer NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("userId", "taskId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fb6a986133f8f6cafb3d4fb31" ON "user_tasks_task" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bcb8e9773d79c9874a61f79c3" ON "user_tasks_task" ("taskId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bcb8e9773d79c9874a61f79c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1fb6a986133f8f6cafb3d4fb31"`,
    );
    await queryRunner.query(`DROP TABLE "user_tasks_task"`);
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
