import { Test, TestingModule } from '@nestjs/testing';
import { MuseumsController } from './museums.controller';
import { MuseumsService } from './museums.service';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';

describe('MuseumsController', () => {
  let controller: MuseumsController;
  let service: MuseumsService;

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

  const mockMuseums = [mockMuseum];

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

  const mockMuseumsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockSupabaseService = {
    uploadFile: jest.fn().mockResolvedValue('https://supabase.example.com/storage/museums/images/test-image.jpg'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuseumsController],
      providers: [
        {
          provide: MuseumsService,
          useValue: mockMuseumsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    controller = module.get<MuseumsController>(MuseumsController);
    service = module.get<MuseumsService>(MuseumsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new museum', async () => {
      mockMuseumsService.create.mockResolvedValue(mockMuseum);

      // Mock file object
      const mockFile = {
        fieldname: 'museumImage',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        destination: './uploads/museums',
        filename: 'test-123456.jpg',
        path: './uploads/museums/test-123456.jpg',
        buffer: Buffer.from('test')
      };

      const result = await controller.create(createMuseumDto, mockFile);

      expect(mockMuseumsService.create).toHaveBeenCalledWith(createMuseumDto, mockFile);
      expect(result).toEqual(mockMuseum);
    });
  });

  describe('findAll', () => {
    it('should return an array of museums', async () => {
      mockMuseumsService.findAll.mockResolvedValue(mockMuseums);

      const result = await controller.findAll();

      expect(mockMuseumsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockMuseums);
    });
  });

  describe('findOne', () => {
    it('should return a museum by id', async () => {
      mockMuseumsService.findOne.mockResolvedValue(mockMuseum);

      const result = await controller.findOne('test-uuid');

      expect(mockMuseumsService.findOne).toHaveBeenCalledWith('test-uuid');
      expect(result).toEqual(mockMuseum);
    });
  });

  describe('update', () => {
    it('should update a museum', async () => {
      const updatedMuseum = { ...mockMuseum, ...updateMuseumDto };
      mockMuseumsService.update.mockResolvedValue(updatedMuseum);

      // Mock file object
      const mockFile = {
        fieldname: 'museumImage',
        originalname: 'updated.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        destination: './uploads/museums',
        filename: 'updated-123456.jpg',
        path: './uploads/museums/updated-123456.jpg',
        buffer: Buffer.from('test')
      };

      const result = await controller.update('test-uuid', updateMuseumDto, mockFile);

      // The updateMuseumDto would have been modified to include the image path
      expect(mockMuseumsService.update).toHaveBeenCalledWith('test-uuid', updateMuseumDto, mockFile);
      expect(result).toEqual(updatedMuseum);
    });
  });

  describe('remove', () => {
    it('should delete a museum', async () => {
      mockMuseumsService.remove.mockResolvedValue(mockMuseum);

      const result = await controller.remove('test-uuid');

      expect(mockMuseumsService.remove).toHaveBeenCalledWith('test-uuid');
      expect(result).toEqual(mockMuseum);
    });
  });
});
