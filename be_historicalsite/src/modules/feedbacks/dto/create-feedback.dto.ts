import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Subject of the feedback',
    enum: FeedbackSubject,
    example: FeedbackSubject.GENERAL,
  })
  @IsNotEmpty()
  @IsEnum(FeedbackSubject)
  subject: FeedbackSubject;

  @ApiProperty({
    description: 'Message content of the feedback',
    example: 'I think it would be great to add more historical images',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  message: string;

  @ApiProperty({
    description: 'Status of the feedback',
    enum: FeedbackStatus,
    example: FeedbackStatus.OPEN,
    required: false,
  })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;
}
