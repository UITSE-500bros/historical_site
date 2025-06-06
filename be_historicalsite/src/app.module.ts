import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeriodsModule } from './modules/periods/periods.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MuseumsModule } from './modules/museums/museums.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot(),
    PrismaModule,
    SupabaseModule,
    PeriodsModule,
    TopicsModule,
    ArticlesModule,
    AuthModule,
    FeedbacksModule,
    PaymentsModule,
    MuseumsModule,
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule {}