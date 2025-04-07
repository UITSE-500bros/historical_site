import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @ApiProperty({
    description: 'The unique identifier of the topic',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  topic_id?: string;

  @ApiProperty({
    description: 'The name of the topic',
    example: 'World War II',
    required: false
  })
  @IsString()
  @IsOptional()
  topic_name?: string;
}
