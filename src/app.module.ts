import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import configuration from './config/configuration';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
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
      },
      inject: [ConfigService],
    }),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('SENDGRID_API_KEY'),
        defaultMailData: {
          from: configService.get('SENDGRID_FROM'),
          text: '',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
