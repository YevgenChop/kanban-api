import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTaskOnDeleteCascade1669288170100 implements MigrationInterface {
  name = 'addTaskOnDeleteCascade1669288170100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_own_boards_board" ADD CONSTRAINT "FK_4cfc8748f6af96511d91f67edaa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_own_boards_board" ADD CONSTRAINT "FK_c3ec36b64379fa9ecbbd03662c3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_own_boards_board" DROP CONSTRAINT "FK_c3ec36b64379fa9ecbbd03662c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_own_boards_board" DROP CONSTRAINT "FK_4cfc8748f6af96511d91f67edaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
