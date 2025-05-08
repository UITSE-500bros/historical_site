import { ApiProperty } from '@nestjs/swagger';

enum FeedbackSubject {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  GENERAL = 'GENERAL'
}

enum FeedbackStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export class Feedback {
  @ApiProperty({ description: 'Unique identifier for the feedback' })
  feedbackId: string;

  @ApiProperty({ description: 'Subject of the feedback', enum: FeedbackSubject })
  subject: FeedbackSubject;

  @ApiProperty({ description: 'Message content of the feedback' })
  message: string;

  @ApiProperty({ description: 'Status of the feedback', enum: FeedbackStatus })
  status: FeedbackStatus;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
