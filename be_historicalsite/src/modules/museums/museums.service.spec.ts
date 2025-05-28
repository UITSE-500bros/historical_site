import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { MuseumsService } from './museums.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

describe('MuseumsService', () => {
  let service: MuseumsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    museum: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockSupabaseService = {
    uploadFile: jest.fn().mockResolvedValue('https://supabase.example.com/storage/images/images/test-image.jpg'),
  };

  const mockMuseum = {
    museumId: 'test-uuid',
    museumName: 'Test Museum',
    museumImage: 'test-image.jpg',
    museumAddress: 'Test Address',
    museumPhone: '1234567890',
    museumEmail: 'test@museum.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createMuseumDto: CreateMuseumDto = {
    museumName: 'Test Museum',
    museumImage: 'test-image.jpg',
    museumAddress: 'Test Address',
    museumPhone: '1234567890',
    museumEmail: 'test@museum.com',
  };

  const updateMuseumDto: UpdateMuseumDto = {
    museumName: 'Updated Museum',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MuseumsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<MuseumsService>(MuseumsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new museum', async () => {
      mockPrismaService.museum.create.mockResolvedValue(mockMuseum);

      // Mock file for testing
      const mockFile = {
        fieldname: 'museumImage',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        buffer: Buffer.from('test'),
      };

      const result = await service.create(createMuseumDto, mockFile);

      // Verify Supabase upload was called
      expect(mockSupabaseService.uploadFile).toHaveBeenCalledWith(
        mockFile.buffer,
        'images',
        'images',
        mockFile.originalname
      );

      // Verify Prisma create was called with the Supabase URL
      expect(mockPrismaService.museum.create).toHaveBeenCalledWith({
        data: {
          museumId: 'test-uuid',
          ...createMuseumDto,
          museumImage: 'https://supabase.example.com/storage/images/images/test-image.jpg',
        },
      });
      expect(result).toEqual(mockMuseum);
    });
  });

  describe('findAll', () => {
    it('should return an array of museums', async () => {
      mockPrismaService.museum.findMany.mockResolvedValue([mockMuseum]);

      const result = await service.findAll();

      expect(mockPrismaService.museum.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(result).toEqual([mockMuseum]);
    });
  });

  describe('findOne', () => {
    it('should return a museum by id', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(mockMuseum);

      const result = await service.findOne('test-uuid');

      expect(mockPrismaService.museum.findUnique).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
      });
      expect(result).toEqual(mockMuseum);
    });

    it('should throw NotFoundException if museum not found', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a museum', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(mockMuseum);
      mockPrismaService.museum.update.mockResolvedValue({
        ...mockMuseum,
        ...updateMuseumDto,
      });

      const result = await service.update('test-uuid', updateMuseumDto);

      expect(mockPrismaService.museum.findUnique).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
      });
      expect(mockPrismaService.museum.update).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
        data: updateMuseumDto,
      });
      expect(result).toEqual({
        ...mockMuseum,
        ...updateMuseumDto,
      });
    });

    it('should update a museum with a new image', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(mockMuseum);
      mockPrismaService.museum.update.mockResolvedValue({
        ...mockMuseum,
        ...updateMuseumDto,
        museumImage: 'https://supabase.example.com/storage/images/images/test-image.jpg',
      });

      // Mock file for testing
      const mockFile = {
        fieldname: 'museumImage',
        originalname: 'updated.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        buffer: Buffer.from('test'),
      };

      const result = await service.update('test-uuid', updateMuseumDto, mockFile);

      // Verify Supabase upload was called
      expect(mockSupabaseService.uploadFile).toHaveBeenCalledWith(
        mockFile.buffer,
        'images',
        'images',
        mockFile.originalname
      );

      // Verify Prisma update was called with the Supabase URL
      expect(mockPrismaService.museum.update).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
        data: {
          ...updateMuseumDto,
          museumImage: 'https://supabase.example.com/storage/images/images/test-image.jpg',
        },
      });
      expect(result).toEqual({
        ...mockMuseum,
        ...updateMuseumDto,
        museumImage: 'https://supabase.example.com/storage/images/images/test-image.jpg',
      });
    });

    it('should throw NotFoundException if museum to update not found', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', updateMuseumDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a museum', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(mockMuseum);
      mockPrismaService.museum.delete.mockResolvedValue(mockMuseum);

      const result = await service.remove('test-uuid');

      expect(mockPrismaService.museum.findUnique).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
      });
      expect(mockPrismaService.museum.delete).toHaveBeenCalledWith({
        where: { museumId: 'test-uuid' },
      });
      expect(result).toEqual(mockMuseum);
    });

    it('should throw NotFoundException if museum to delete not found', async () => {
      mockPrismaService.museum.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
