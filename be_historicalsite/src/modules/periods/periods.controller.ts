import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new historical period' })
  @ApiResponse({ status: 201, description: 'The period has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Admin authentication required.' })
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a historical period' })
  @ApiResponse({ status: 200, description: 'The period has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Period not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Admin authentication required.' })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a historical period' })
  @ApiResponse({ status: 204, description: 'The period has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Period not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Admin authentication required.' })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
