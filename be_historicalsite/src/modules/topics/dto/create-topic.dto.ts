import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({
    description: 'The name of the topic',
    example: 'World War II',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  topic_name: string;
}
