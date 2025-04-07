import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';

enum FeedbackSubject {
  Ticket_Issue = 'Ticket_Issue',
  Event_Complaint = 'Event_Complaint',
  Website_Suggestion = 'Website_Suggestion',
  Other = 'Other',
}

enum FeedbackStatus {
  Pending = 'Pending',
  In_Progress = 'In_Progress',
  Resolved = 'Resolved',
}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiProperty({
    description: 'The unique identifier of the feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  feedback_id?: string;

  @ApiProperty({
    description: 'The email of the user submitting the feedback',
    example: 'user@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  user_email?: string;

  @ApiProperty({
    description: 'The subject of the feedback',
    example: 'Website_Suggestion',
    enum: FeedbackSubject,
    required: false
  })
  @IsEnum(FeedbackSubject)
  @IsOptional()
  subject?: string;

  @ApiProperty({
    description: 'The feedback message',
    example: 'I would like to suggest adding a search feature to the website.',
    required: false
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({
    description: 'The status of the feedback',
    example: 'In_Progress',
    enum: FeedbackStatus,
    required: false
  })
  @IsEnum(FeedbackStatus)
  @IsOptional()
  status?: string;
}
