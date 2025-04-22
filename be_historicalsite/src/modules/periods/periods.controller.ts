import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@ApiTags('Periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new historical period' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The period has been successfully created.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all historical periods' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns all historical periods.' 
  })
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a historical period by ID' })
  @ApiParam({ name: 'id', description: 'Period ID (UUID)', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Returns the requested historical period.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Period not found.' 
  })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a historical period' })
  @ApiParam({ name: 'id', description: 'Period ID (UUID)', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The period has been successfully updated.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Period not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a historical period' })
  @ApiParam({ name: 'id', description: 'Period ID (UUID)', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The period has been successfully deleted.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Period not found.' 
  })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
