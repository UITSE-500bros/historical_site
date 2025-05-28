import { Module } from '@nestjs/common';
import { MuseumsService } from './museums.service';
import { MuseumsController } from './museums.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  controllers: [MuseumsController],
  providers: [MuseumsService, PrismaService, SupabaseService],
})
export class MuseumsModule {}
