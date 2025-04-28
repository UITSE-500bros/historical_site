import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new historical period' })
  @ApiResponse({ status: 201, description: 'The period has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all historical periods' })
  @ApiResponse({ status: 200, description: 'Return all periods.' })
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a historical period by id' })
  @ApiResponse({ status: 200, description: 'Return the period.' })
  @ApiResponse({ status: 404, description: 'Period not found.' })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a historical period' })
  @ApiResponse({ status: 200, description: 'The period has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Period not found.' })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a historical period' })
  @ApiResponse({ status: 204, description: 'The period has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Period not found.' })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
