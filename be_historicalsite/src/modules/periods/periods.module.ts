import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PeriodsController],
  imports: [AuthModule],
  providers: [PeriodsService, PrismaService],
})
export class PeriodsModule {}
