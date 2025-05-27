import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, PrismaService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
