import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBaseEntity1667916265331 implements MigrationInterface {
  name = 'addBaseEntity1667916265331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_d92c98138733350c58be167b78c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "boardId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "statusId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_ec241c244980d39996b501f3970"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" DROP CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1"`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "ownerId"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "ownerId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_ec241c244980d39996b501f3970" PRIMARY KEY ("boardId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d92c98138733350c58be167b78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_ec241c244980d39996b501f3970"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0" PRIMARY KEY ("boardId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_d92c98138733350c58be167b78c" PRIMARY KEY ("userId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ec241c244980d39996b501f397"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP COLUMN "boardId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD "boardId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_d92c98138733350c58be167b78c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0" PRIMARY KEY ("userId", "boardId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_5c112b153701f554843915f643f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_9bcb8e9773d79c9874a61f79c3d" PRIMARY KEY ("taskId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1fb6a986133f8f6cafb3d4fb31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("taskId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_5c112b153701f554843915f643f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_1fb6a986133f8f6cafb3d4fb31e" PRIMARY KEY ("userId")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bcb8e9773d79c9874a61f79c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP COLUMN "taskId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD "taskId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_1fb6a986133f8f6cafb3d4fb31e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("userId", "taskId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d92c98138733350c58be167b78" ON "user_boards_board" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec241c244980d39996b501f397" ON "user_boards_board" ("boardId") `,
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
      `ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_d92c98138733350c58be167b78c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_ec241c244980d39996b501f3970" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_ec241c244980d39996b501f3970"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "FK_d92c98138733350c58be167b78c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`,
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
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ec241c244980d39996b501f397"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d92c98138733350c58be167b78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_5c112b153701f554843915f643f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_1fb6a986133f8f6cafb3d4fb31e" PRIMARY KEY ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP COLUMN "taskId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD "taskId" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bcb8e9773d79c9874a61f79c3" ON "user_tasks_task" ("taskId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_1fb6a986133f8f6cafb3d4fb31e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("taskId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_5c112b153701f554843915f643f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_9bcb8e9773d79c9874a61f79c3d" PRIMARY KEY ("taskId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fb6a986133f8f6cafb3d4fb31" ON "user_tasks_task" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" DROP CONSTRAINT "PK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("userId", "taskId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_d92c98138733350c58be167b78c" PRIMARY KEY ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP COLUMN "boardId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD "boardId" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec241c244980d39996b501f397" ON "user_boards_board" ("boardId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_d92c98138733350c58be167b78c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0" PRIMARY KEY ("boardId", "userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_ec241c244980d39996b501f3970" PRIMARY KEY ("boardId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d92c98138733350c58be167b78" ON "user_boards_board" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" DROP CONSTRAINT "PK_ec241c244980d39996b501f3970"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "PK_878ad615f92edb780a5c45fd9d0" PRIMARY KEY ("userId", "boardId")`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "ownerId"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "ownerId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" DROP CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1"`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "board" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_ec241c244980d39996b501f3970" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "statusId" integer`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "boardId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "status" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_boards_board" ADD CONSTRAINT "FK_d92c98138733350c58be167b78c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
  }
}
