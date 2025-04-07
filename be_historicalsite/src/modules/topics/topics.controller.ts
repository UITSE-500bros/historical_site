import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new topic',
    description: 'Creates a new topic with the provided name.'
  })
  @ApiBody({ 
    type: CreateTopicDto,
    description: 'Topic data to create'
  })
  @ApiCreatedResponse({ 
    description: 'The topic has been successfully created.',
    type: Topic 
  })
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all topics',
    description: 'Retrieves a list of all topics in the system.'
  })
  @ApiOkResponse({ 
    description: 'List of all topics',
    type: [Topic],
    isArray: true
  })
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a topic by ID',
    description: 'Retrieves a specific topic by its UUID, including related articles.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the topic',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The topic with its related articles',
    type: Topic 
  })
  @ApiNotFoundResponse({ 
    description: 'Topic with the specified ID was not found'
  })
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a topic',
    description: 'Updates a specific topic by its UUID with the provided data.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the topic to update',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateTopicDto,
    description: 'Topic data to update'
  })
  @ApiOkResponse({ 
    description: 'The topic has been successfully updated',
    type: Topic 
  })
  @ApiNotFoundResponse({ 
    description: 'Topic with the specified ID was not found'
  })
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a topic',
    description: 'Removes a specific topic by its UUID from the system.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the topic to delete',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The topic has been successfully deleted',
    type: Topic 
  })
  @ApiNotFoundResponse({ 
    description: 'Topic with the specified ID was not found'
  })
  remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}
