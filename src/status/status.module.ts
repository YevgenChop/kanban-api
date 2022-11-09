import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { StatusRepository } from './status.repository';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService, StatusRepository],
})
export class StatusModule {}
