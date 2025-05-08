import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ArticleType } from '../../../generated/prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    article: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    content: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    image: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    personArticle: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    eventArticle: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an article', async () => {
      const createArticleDto = {
        articleType: ArticleType.EVENT,
        articleName: 'Test Article',
        articleContentList: {},
      };

      const expectedArticle = {
        articleId: expect.any(String),
        ...createArticleDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.article.create.mockResolvedValue(expectedArticle);

      const result = await service.create(createArticleDto);

      expect(result).toEqual(expectedArticle);
      expect(mockPrismaService.article.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          articleId: expect.any(String),
          ...createArticleDto,
        }),
      });
    });
  });

  describe('findAll', () => {
    it('should return all articles', async () => {
      const expectedArticles = [
        {
          articleId: uuidv4(),
          articleType: ArticleType.EVENT,
          articleName: 'Test Article',
          articleContentList: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10
      };
      
      mockPrismaService.article.findMany.mockResolvedValue(expectedArticles);
      mockPrismaService.article.count.mockResolvedValue(expectedArticles.length);

      const result = await service.findAll(paginationDto);

      expect(result.data).toEqual(expectedArticles);
      expect(mockPrismaService.article.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an article if found', async () => {
      const articleId = uuidv4();
      const expectedArticle = {
        articleId,
        articleType: ArticleType.EVENT,
        articleName: 'Test Article',
        articleContentList: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.article.findUnique.mockResolvedValue(expectedArticle);

      const result = await service.findOne(articleId);

      expect(result).toEqual(expectedArticle);
      expect(mockPrismaService.article.findUnique).toHaveBeenCalledWith({
        where: { articleId },
      });
    });

    it('should throw NotFoundException if article not found', async () => {
      const articleId = uuidv4();
      mockPrismaService.article.findUnique.mockResolvedValue(null);

      await expect(service.findOne(articleId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an article if found', async () => {
      const articleId = uuidv4();
      const updateArticleDto = {
        article: {
          articleName: 'Updated Article',
        },
      };

      const expectedArticle = {
        articleId,
        articleType: ArticleType.EVENT,
        articleName: 'Updated Article',
        articleContentList: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.article.update.mockResolvedValue(expectedArticle);

      const result = await service.update(articleId, updateArticleDto);

      expect(result).toEqual(expectedArticle);
      expect(mockPrismaService.article.update).toHaveBeenCalledWith({
        where: { articleId },
        data: expect.any(Object),
      });
    });

    it('should throw NotFoundException if article not found', async () => {
      const articleId = uuidv4();
      mockPrismaService.article.update.mockRejectedValue(new Error());

      const updateArticleDto: UpdateArticleDto = {
        article: {
          articleName: 'Test Article'
        }
      };

      await expect(service.update(articleId, updateArticleDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an article if found', async () => {
      const articleId = uuidv4();
      const expectedArticle = {
        articleId,
        articleType: ArticleType.EVENT,
        articleName: 'Test Article',
        articleContentList: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.article.delete.mockResolvedValue(expectedArticle);

      const result = await service.remove(articleId);

      expect(result).toEqual(expectedArticle);
      expect(mockPrismaService.article.delete).toHaveBeenCalledWith({
        where: { articleId },
      });
    });

    it('should throw NotFoundException if article not found', async () => {
      const articleId = uuidv4();
      mockPrismaService.article.delete.mockRejectedValue(new Error());

      await expect(service.remove(articleId)).rejects.toThrow(NotFoundException);
    });
  });

  // Content tests
  describe('createContent', () => {
    it('should create a content', async () => {
      const createContentDto = {
        contentName: 'Test Content',
        articleId: uuidv4(),
        content: 'Test content text',
        imagesId: {},
      };

      const expectedContent = {
        contentId: expect.any(String),
        ...createContentDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.content.create.mockResolvedValue(expectedContent);

      const result = await service.createContent(createContentDto);

      expect(result).toEqual(expectedContent);
      expect(mockPrismaService.content.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          contentId: expect.any(String),
          ...createContentDto,
        }),
      });
    });
  });

  // Image tests
  describe('createImage', () => {
    it('should create an image', async () => {
      const createImageDto = {
        src: 'test.jpg',
        alt: 'Test Image',
        caption: 'Test Caption',
        width: 100,
        height: 100,
      };

      const expectedImage = {
        imageId: expect.any(String),
        ...createImageDto,
        contentId: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.image.create.mockResolvedValue(expectedImage);

      const result = await service.createImage(createImageDto);

      expect(result).toEqual(expectedImage);
      expect(mockPrismaService.image.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          imageId: expect.any(String),
          ...createImageDto,
          contentId: null,
        }),
      });
    });
  });

  // Person Article tests
  describe('createPersonArticle', () => {
    it('should create a person article', async () => {
      const createPersonArticleDto = {
        article: {
          articleType: ArticleType.PERSON,
          articleName: 'Test Person Article',
          articleContentList: {},
        },
        personName: 'Test Person',
        personAvatar: 'avatar.jpg',
        birthYear: 1900,
        deathYear: 2000,
        nationality: 'Test Nationality',
      };

      const expectedArticle = {
        articleId: expect.any(String),
        ...createPersonArticleDto.article,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      const expectedPersonArticle = {
        articleId: expectedArticle.articleId,
        ...createPersonArticleDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.article.create.mockResolvedValue(expectedArticle);
      mockPrismaService.personArticle.create.mockResolvedValue(expectedPersonArticle);

      const result = await service.createPersonArticle(createPersonArticleDto);

      expect(result).toEqual(expectedPersonArticle);
      expect(mockPrismaService.article.create).toHaveBeenCalled();
      expect(mockPrismaService.personArticle.create).toHaveBeenCalled();
    });
  });

  // Event Article tests
  describe('createEventArticle', () => {
    it('should create an event article', async () => {
      const createEventArticleDto = {
        article: {
          articleType: ArticleType.EVENT,
          articleName: 'Test Event Article',
          articleContentList: {},
        },
        periodId: uuidv4(),
        topicId: uuidv4(),
      };

      const expectedArticle = {
        articleId: expect.any(String),
        ...createEventArticleDto.article,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      const expectedEventArticle = {
        articleId: expectedArticle.articleId,
        ...createEventArticleDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockPrismaService.article.create.mockResolvedValue(expectedArticle);
      mockPrismaService.eventArticle.create.mockResolvedValue(expectedEventArticle);

      const result = await service.createEventArticle(createEventArticleDto);

      expect(result).toEqual(expectedEventArticle);
      expect(mockPrismaService.article.create).toHaveBeenCalled();
      expect(mockPrismaService.eventArticle.create).toHaveBeenCalled();
    });
  });
});
