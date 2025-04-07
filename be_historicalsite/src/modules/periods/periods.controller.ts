import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';

@ApiTags('Periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new period',
    description: 'Creates a new historical period with the provided details.'
  })
  @ApiBody({ 
    type: CreatePeriodDto,
    description: 'Period data to create'
  })
  @ApiCreatedResponse({ 
    description: 'The period has been successfully created.',
    type: Period 
  })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all periods',
    description: 'Retrieves a list of all historical periods in the system.'
  })
  @ApiOkResponse({ 
    description: 'List of all periods',
    type: [Period],
    isArray: true
  })
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a period by ID',
    description: 'Retrieves a specific historical period by its UUID, including related articles.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the period',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The period with its related articles',
    type: Period 
  })
  @ApiNotFoundResponse({ 
    description: 'Period with the specified ID was not found'
  })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a period',
    description: 'Updates a specific historical period by its UUID with the provided data.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the period to update',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdatePeriodDto,
    description: 'Period data to update'
  })
  @ApiOkResponse({ 
    description: 'The period has been successfully updated',
    type: Period 
  })
  @ApiNotFoundResponse({ 
    description: 'Period with the specified ID was not found'
  })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a period',
    description: 'Removes a specific historical period by its UUID from the system.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the period to delete',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The period has been successfully deleted',
    type: Period 
  })
  @ApiNotFoundResponse({ 
    description: 'Period with the specified ID was not found'
  })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
