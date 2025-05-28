import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';

// Define a type for the uploaded file
type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer: Buffer;
};

@Injectable()
export class MuseumsService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService
  ) {}

  async create(createMuseumDto: CreateMuseumDto, imageFile?: MulterFile) {
    // Generate a UUID for the museum
    const museumId = uuidv4();
    
    let museumImage = createMuseumDto.museumImage;

    // If an image file was uploaded, store it in Supabase
    if (imageFile) {
      try {
        // Upload the image to Supabase
        const imageUrl = await this.supabaseService.uploadFile(
          imageFile.buffer,
          'images', // bucket name
          'museums',  // path within bucket
          imageFile.originalname
        );
        
        // Set the museum image URL to the Supabase URL
        museumImage = imageUrl;
      } catch (error) {
        throw new BadRequestException('Failed to upload image: ' + error.message);
      }
    }

    // Create the museum with the image URL
    return this.prisma.museum.create({
      data: {
        museumId,
        ...createMuseumDto,
        museumImage,
      },
    });
  }

  async findAll() {
    return this.prisma.museum.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const museum = await this.prisma.museum.findUnique({
      where: { museumId: id },
    });

    if (!museum) {
      throw new NotFoundException(`Museum with ID ${id} not found`);
    }

    return museum;
  }

  async update(id: string, updateMuseumDto: UpdateMuseumDto, imageFile?: MulterFile) {
    // Check if museum exists
    await this.findOne(id);
    
    let data = { ...updateMuseumDto };

    // If an image file was uploaded, store it in Supabase
    if (imageFile) {
      try {
        // Upload the image to Supabase
        const imageUrl = await this.supabaseService.uploadFile(
          imageFile.buffer,
          'museums', // bucket name
          'images',  // path within bucket
          imageFile.originalname
        );
        
        // Set the museum image URL to the Supabase URL
        data.museumImage = imageUrl;
      } catch (error) {
        throw new BadRequestException('Failed to upload image: ' + error.message);
      }
    }

    // Update the museum
    return this.prisma.museum.update({
      where: { museumId: id },
      data,
    });
  }

  async remove(id: string) {
    // Check if museum exists
    await this.findOne(id);

    // Delete the museum
    return this.prisma.museum.delete({
      where: { museumId: id },
    });
  }
}
