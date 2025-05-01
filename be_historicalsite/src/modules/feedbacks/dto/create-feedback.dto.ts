import { FeedbackSubject, FeedbackStatus } from 'generated/prisma/client';

export class CreateFeedbackDto {
  subject: FeedbackSubject;
  message: string;
  status?: FeedbackStatus;
}
