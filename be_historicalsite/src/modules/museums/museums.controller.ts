import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MuseumsService } from './museums.service';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';
import { Museum } from './entities/museum.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Add proper type definition for Express.Multer.File
type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

@ApiTags('museums')
@Controller('museums')
export class MuseumsController {
  constructor(private readonly museumsService: MuseumsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new museum' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMuseumDto })
  @ApiResponse({ status: 201, description: 'The museum has been successfully created.', type: Museum })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(
    FileInterceptor('museumImage', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async create(
    @Body() createMuseumDto: CreateMuseumDto,
    @UploadedFile() file: MulterFile,
  ) {
    // Pass the file to the service for Supabase storage
    return this.museumsService.create(createMuseumDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all museums' })
  @ApiResponse({ status: 200, description: 'Return all museums.', type: [Museum] })
  findAll() {
    return this.museumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a museum by id' })
  @ApiParam({ name: 'id', description: 'Museum ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the museum.', type: Museum })
  @ApiResponse({ status: 404, description: 'Museum not found.' })
  findOne(@Param('id') id: string) {
    return this.museumsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a museum' })
  @ApiParam({ name: 'id', description: 'Museum ID', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateMuseumDto })
  @ApiResponse({ status: 200, description: 'The museum has been successfully updated.', type: Museum })
  @ApiResponse({ status: 404, description: 'Museum not found.' })
  @UseInterceptors(
    FileInterceptor('museumImage', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateMuseumDto: UpdateMuseumDto,
    @UploadedFile() file: MulterFile,
  ) {
    // Pass the file to the service for Supabase storage
    return this.museumsService.update(id, updateMuseumDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a museum' })
  @ApiParam({ name: 'id', description: 'Museum ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'The museum has been successfully deleted.', type: Museum })
  @ApiResponse({ status: 404, description: 'Museum not found.' })
  remove(@Param('id') id: string) {
    return this.museumsService.remove(id);
  }
}
