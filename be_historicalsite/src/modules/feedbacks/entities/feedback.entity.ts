import { ApiProperty } from '@nestjs/swagger';

export class Feedback {
  @ApiProperty({
    description: 'The unique identifier of the feedback',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  feedback_id: string;

  @ApiProperty({
    description: 'The email of the user submitting the feedback',
    example: 'user@example.com'
  })
  user_email: string;

  @ApiProperty({
    description: 'The subject of the feedback',
    example: 'Website_Suggestion',
    enum: ['Ticket_Issue', 'Event_Complaint', 'Website_Suggestion', 'Other'],
    default: 'Other'
  })
  subject: string;

  @ApiProperty({
    description: 'The feedback message',
    example: 'I would like to suggest adding a search feature to the website.'
  })
  message: string;

  @ApiProperty({
    description: 'The status of the feedback',
    example: 'Pending',
    enum: ['Pending', 'In_Progress', 'Resolved'],
    default: 'Pending'
  })
  status: string;

  @ApiProperty({
    description: 'The date when the feedback was created',
    example: '2025-04-07T12:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date when the feedback was last updated',
    example: '2025-04-07T12:00:00Z'
  })
  updated_at: Date;
}
