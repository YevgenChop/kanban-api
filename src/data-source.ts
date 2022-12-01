import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  port: parseInt(configService.get('DB_PORT')),
  host: configService.get('DB_HOST'),
  database: configService.get('DB_NAME'),
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: configService.get('DB_MIGRATIONS_RUN') === 'true',
  synchronize: configService.get('DB_SYNCRONIZE') === 'true',
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
