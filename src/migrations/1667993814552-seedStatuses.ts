import { statuses } from '../seeds/status.seed';
import { Status } from '../status/status.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedStatuses1667993814552 implements MigrationInterface {
  name?: string;
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const status of statuses) {
      await queryRunner.manager.save(
        queryRunner.manager.create<Status>(Status, { title: status.title }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM status`);
  }
}
