import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    articles: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockArticle = {
    article_id: '123e4567-e89b-12d3-a456-426614174000',
    article_name: 'The Renaissance Art',
    article_content: 'Content about Renaissance art',
    article_type: 'Event',
    created_at: new Date(),
    updated_at: new Date(),
    images_list: JSON.stringify(['image1.jpg', 'image2.jpg']),
    period_id: '123e4567-e89b-12d3-a456-426614174001',
    topic_id: '123e4567-e89b-12d3-a456-426614174002',
    period: {
      period_id: '123e4567-e89b-12d3-a456-426614174001',
      period_name: 'Renaissance',
    },
    topic: {
      topic_id: '123e4567-e89b-12d3-a456-426614174002',
      topic_name: 'Art',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createArticleDto: CreateArticleDto = { 
        article_name: 'The Renaissance Art',
        article_content: 'Content about Renaissance art',
        article_type: 'Event',
        images_list: ['image1.jpg', 'image2.jpg'],
        period_id: '123e4567-e89b-12d3-a456-426614174001',
        topic_id: '123e4567-e89b-12d3-a456-426614174002',
      };
      mockPrismaService.articles.create.mockResolvedValue(mockArticle);

      const result = await service.create(createArticleDto);

      expect(mockPrismaService.articles.create).toHaveBeenCalledWith({
        data: {
          article_name: createArticleDto.article_name,
          article_content: createArticleDto.article_content,
          article_type: createArticleDto.article_type,
          images_list: createArticleDto.images_list,
          period_id: createArticleDto.period_id,
          topic_id: createArticleDto.topic_id,
        },
        include: {
          period: true,
          topic: true,
        },
      });
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      mockPrismaService.articles.findMany.mockResolvedValue([mockArticle]);

      const result = await service.findAll();

      expect(mockPrismaService.articles.findMany).toHaveBeenCalledWith({
        include: {
          period: true,
          topic: true,
        },
      });
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('findOne', () => {
    it('should return an article by id', async () => {
      mockPrismaService.articles.findUnique.mockResolvedValue(mockArticle);

      const result = await service.findOne(mockArticle.article_id);

      expect(mockPrismaService.articles.findUnique).toHaveBeenCalledWith({
        where: { article_id: mockArticle.article_id },
        include: {
          period: true,
          topic: true,
        },
      });
      expect(result).toEqual(mockArticle);
    });

    it('should throw NotFoundException if article not found', async () => {
      mockPrismaService.articles.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const updateArticleDto: UpdateArticleDto = { article_name: 'Updated Article' };
      const updatedArticle = {
        ...mockArticle,
        article_name: 'Updated Article',
      };
      mockPrismaService.articles.update.mockResolvedValue(updatedArticle);

      const result = await service.update(mockArticle.article_id, updateArticleDto);

      expect(mockPrismaService.articles.update).toHaveBeenCalledWith({
        where: { article_id: mockArticle.article_id },
        data: updateArticleDto,
        include: {
          period: true,
          topic: true,
        },
      });
      expect(result).toEqual(updatedArticle);
    });

    it('should update images_list with proper JSON conversion', async () => {
      const updateArticleDto: UpdateArticleDto = { 
        images_list: ['new-image1.jpg', 'new-image2.jpg']
      };
      const updatedArticle = {
        ...mockArticle,
        images_list: JSON.stringify(['new-image1.jpg', 'new-image2.jpg']),
      };
      mockPrismaService.articles.update.mockResolvedValue(updatedArticle);

      await service.update(mockArticle.article_id, updateArticleDto);

      expect(mockPrismaService.articles.update).toHaveBeenCalledWith({
        where: { article_id: mockArticle.article_id },
        data: expect.objectContaining({
          images_list: expect.any(Object),
        }),
        include: {
          period: true,
          topic: true,
        },
      });
    });

    it('should throw NotFoundException if article to update not found', async () => {
      const updateArticleDto: UpdateArticleDto = { article_name: 'Updated Article' };
      mockPrismaService.articles.update.mockRejectedValue(new Error());

      await expect(
        service.update('non-existent-id', updateArticleDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      mockPrismaService.articles.delete.mockResolvedValue(mockArticle);

      const result = await service.remove(mockArticle.article_id);

      expect(mockPrismaService.articles.delete).toHaveBeenCalledWith({
        where: { article_id: mockArticle.article_id },
        include: {
          period: true,
          topic: true,
        },
      });
      expect(result).toEqual(mockArticle);
    });

    it('should throw NotFoundException if article to remove not found', async () => {
      mockPrismaService.articles.delete.mockRejectedValue(new Error());

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
