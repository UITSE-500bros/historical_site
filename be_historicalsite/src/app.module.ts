import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TopicsModule } from './modules/topics/topics.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    TopicsModule,
    PeriodsModule,
    ArticlesModule,
    FeedbacksModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
