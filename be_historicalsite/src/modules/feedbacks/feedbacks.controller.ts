import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new feedback',
    description: 'Creates a new feedback with the provided details.'
  })
  @ApiBody({ 
    type: CreateFeedbackDto,
    description: 'Feedback data to create'
  })
  @ApiCreatedResponse({ 
    description: 'The feedback has been successfully created.',
    type: Feedback 
  })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all feedbacks',
    description: 'Retrieves a list of all feedbacks in the system.'
  })
  @ApiOkResponse({ 
    description: 'List of all feedbacks',
    type: Feedback,
    isArray: true
  })
  findAll() {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a feedback by ID',
    description: 'Retrieves a specific feedback by its UUID.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the feedback',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The feedback',
    type: Feedback 
  })
  @ApiNotFoundResponse({ 
    description: 'Feedback with the specified ID was not found'
  })
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a feedback',
    description: 'Updates a specific feedback by its UUID with the provided data.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the feedback to update',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateFeedbackDto,
    description: 'Feedback data to update'
  })
  @ApiOkResponse({ 
    description: 'The feedback has been successfully updated',
    type: Feedback 
  })
  @ApiNotFoundResponse({ 
    description: 'Feedback with the specified ID was not found'
  })
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a feedback',
    description: 'Removes a specific feedback by its UUID from the system.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the feedback to delete',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The feedback has been successfully deleted',
    type: Feedback 
  })
  @ApiNotFoundResponse({ 
    description: 'Feedback with the specified ID was not found'
  })
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(id);
  }
}
