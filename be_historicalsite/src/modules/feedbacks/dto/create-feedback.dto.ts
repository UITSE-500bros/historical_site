import { FeedbackSubject, FeedbackStatus } from 'prisma/generated/prisma';

export class CreateFeedbackDto {
  subject: FeedbackSubject;
  message: string;
  status?: FeedbackStatus;
}
