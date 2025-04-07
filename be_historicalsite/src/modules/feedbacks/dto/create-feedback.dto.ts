import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'The email of the user submitting the feedback',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  user_email: string;

  @ApiProperty({
    description: 'The subject of the feedback',
    example: 'Website_Suggestion',
    enum: FeedbackSubject,
    default: 'Other'
  })
  @IsOptional()
  @IsEnum(FeedbackSubject)
  subject?: string;

  @ApiProperty({
    description: 'The feedback message',
    example: 'I would like to suggest adding a search feature to the website.'
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The status of the feedback',
    example: 'Pending',
    enum: FeedbackStatus,
    default: 'Pending'
  })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: string;
}
