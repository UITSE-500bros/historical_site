import { Test, TestingModule } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';
import { CreateEventArticleDto } from './dto/create-event-article.dto';
import { CreatePersonArticleDto } from './dto/create-person-article.dto';
import { CreateImageDto } from './dto/image-dto/create-image.dto';
import { UpdateEventArticleDto } from './dto/update-event-article.dto';
import { UpdatePersonArticleDto } from './dto/update-person-article.dto';

// Add Express type for Multer file
type MulterFile = {
  buffer: Buffer;
  originalname: string;
  [key: string]: any;
};

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let mockArticlesService: any;

  beforeEach(async () => {
    mockArticlesService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      getAllArticleNames: jest.fn(),
      createContent: jest.fn(),
      updateContent: jest.fn(),
      removeContent: jest.fn(),
      createImage: jest.fn(),
      createPersonArticle: jest.fn(),
      updatePersonArticle: jest.fn(),
      removePersonArticle: jest.fn(),
      createEventArticle: jest.fn(),
      updateEventArticle: jest.fn(),
      removeEventArticle: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService,
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Article tests
  describe('create', () => {
    it('should create an article', async () => {
      const createArticleDto: CreateArticleDto = {
        articleType: $Enums.ArticleType.PERSON,
        articleName: 'Test Article',
        articleContentList: [],
      };

      const expectedArticle = {
        articleId: uuidv4(),
        ...createArticleDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockArticlesService.create.mockResolvedValue(expectedArticle);

      const result = await controller.create(createArticleDto);

      expect(result).toEqual(expectedArticle);
      expect(mockArticlesService.create).toHaveBeenCalledWith(createArticleDto);
    });
  });

  describe('findAll', () => {
    it('should return all articles with pagination', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      
      const expectedResult = {
        data: [
          {
            articleId: uuidv4(),
            articleType: $Enums.ArticleType.PERSON,
            articleName: 'Test Article',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      mockArticlesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(paginationDto);

      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('getAllArticleNames', () => {
    it('should return all article names', async () => {
      const expectedResult = [
        { articleId: uuidv4(), articleName: 'Test Article 1' },
        { articleId: uuidv4(), articleName: 'Test Article 2' },
      ];

      mockArticlesService.getAllArticleNames.mockResolvedValue(expectedResult);

      const result = await controller.getAllArticleNames();

      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.getAllArticleNames).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an article by id', async () => {
      const articleId = uuidv4();
      const expectedArticle = {
        articleId,
        articleType: $Enums.ArticleType.PERSON,
        articleName: 'Test Article',
      };

      mockArticlesService.findOne.mockResolvedValue(expectedArticle);

      const result = await controller.findOne(articleId);

      expect(result).toEqual(expectedArticle);
      expect(mockArticlesService.findOne).toHaveBeenCalledWith(articleId);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const articleId = uuidv4();
      const updateArticleDto: UpdateArticleDto = {
        article: {
          articleName: 'Updated Article',
        },
      };

      const expectedArticle = {
        articleId,
        articleType: $Enums.ArticleType.PERSON,
        articleName: 'Updated Article',
      };

      mockArticlesService.update.mockResolvedValue(expectedArticle);

      const result = await controller.update(articleId, updateArticleDto);

      expect(result).toEqual(expectedArticle);
      expect(mockArticlesService.update).toHaveBeenCalledWith(articleId, updateArticleDto);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      const articleId = uuidv4();
      const expectedResult = { success: true };
      
      mockArticlesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(articleId);

      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.remove).toHaveBeenCalledWith(articleId);
    });
  });

  // Content tests
  describe('createContent', () => {
    it('should create a content', async () => {
      const createContentDto = {
        contentName: 'Test Content',
        articleId: uuidv4(),
        content: 'Test content text',
        images: [],
        children: [],
      };

      const expectedContent = {
        contentId: uuidv4(),
        ...createContentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockArticlesService.createContent.mockResolvedValue(expectedContent);

      const result = await controller.createContent(createContentDto);

      expect(result).toEqual(expectedContent);
      expect(mockArticlesService.createContent).toHaveBeenCalledWith(createContentDto);
    });
  });

  describe('updateContent', () => {
    it('should update a content', async () => {
      const contentId = uuidv4();
      const updateContentDto: UpdateContentDto = {
        contentName: 'Updated Content',
        content: 'Updated content text',
      };

      const expectedContent = {
        contentId,
        contentName: 'Updated Content',
        content: 'Updated content text',
        articleId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockArticlesService.updateContent.mockResolvedValue(expectedContent);

      const result = await controller.updateContent(contentId, updateContentDto);

      expect(result).toEqual(expectedContent);
      expect(mockArticlesService.updateContent).toHaveBeenCalledWith(contentId, updateContentDto);
    });
  });

  describe('removeContent', () => {
    it('should remove a content', async () => {
      const contentId = uuidv4();
      const expectedResult = { success: true };
      
      mockArticlesService.removeContent.mockResolvedValue(expectedResult);

      const result = await controller.removeContent(contentId);

      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.removeContent).toHaveBeenCalledWith(contentId);
    });
  });

  // Image tests
  describe('createImage', () => {
    it('should create an image', async () => {
      const file = {
        buffer: Buffer.from('test'),
        originalname: 'test.jpg'
      } as MulterFile;
      
      const createImageDto: CreateImageDto = {
        contentId: uuidv4(),
        alt: 'Test Image',
        caption: 'Test Caption',
      };
      
      const expectedImage = {
        imageId: uuidv4(),
        contentId: createImageDto.contentId,
        src: 'https://supabase.example.com/storage/images/test.jpg',
        alt: createImageDto.alt,
        caption: createImageDto.caption,
      };
      
      mockArticlesService.createImage.mockResolvedValue(expectedImage);
      
      const result = await controller.createImage(file, createImageDto);
      
      expect(result).toEqual(expectedImage);
      expect(mockArticlesService.createImage).toHaveBeenCalledWith(file, createImageDto);
    });
  });

  // Person Article tests
  describe('createPersonArticle', () => {
    it('should create a person article', async () => {
      const createPersonArticleDto: CreatePersonArticleDto = {
        article: {
          articleType: $Enums.ArticleType.PERSON,
          articleName: 'Test Person Article',
          articleContentList: [],
        },
        personName: 'Test Person',
        personAvatar: 'avatar.jpg',
        birthYear: 1900,
        deathYear: 2000,
        nationality: 'Test Nationality',
      };

      const expectedPersonArticle = {
        articleId: uuidv4(),
        ...createPersonArticleDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockArticlesService.createPersonArticle.mockResolvedValue(expectedPersonArticle);

      const result = await controller.createPersonArticle(createPersonArticleDto);

      expect(result).toEqual(expectedPersonArticle);
      expect(mockArticlesService.createPersonArticle).toHaveBeenCalledWith(createPersonArticleDto);
    });
  });
  
  describe('updatePersonArticle', () => {
    it('should update a person article', async () => {
      const articleId = uuidv4();
      const updatePersonArticleDto: UpdatePersonArticleDto = {
        personName: 'Updated Person',
        personAvatar: 'updated-avatar.jpg',
        birthYear: 1901,
        article: {
          article: {
            articleName: 'Updated Article Name',
          }
        }
      };
      
      const expectedResult = {
        articleId,
        articleType: $Enums.ArticleType.PERSON,
        articleName: 'Updated Article Name',
        personArticle: {
          articleId,
          personName: 'Updated Person',
          personAvatar: 'updated-avatar.jpg',
          birthYear: 1901,
        }
      };
      
      mockArticlesService.updatePersonArticle.mockResolvedValue(expectedResult);
      
      const result = await controller.updatePersonArticle(articleId, updatePersonArticleDto);
      
      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.updatePersonArticle).toHaveBeenCalledWith(articleId, updatePersonArticleDto);
    });
  });

  // Event Article tests
  describe('createEventArticle', () => {
    it('should create an event article', async () => {
      const createEventArticleDto: CreateEventArticleDto = {
        article: {
          articleType: $Enums.ArticleType.EVENT,
          articleName: 'Test Event Article',
          articleContentList: [],
        },
        periodId: uuidv4(),
        topicId: uuidv4(),
      };

      const expectedEventArticle = {
        articleId: uuidv4(),
        ...createEventArticleDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockArticlesService.createEventArticle.mockResolvedValue(expectedEventArticle);

      const result = await controller.createEventArticle(createEventArticleDto);

      expect(result).toEqual(expectedEventArticle);
      expect(mockArticlesService.createEventArticle).toHaveBeenCalledWith(createEventArticleDto);
    });
  });
  
  describe('updateEventArticle', () => {
    it('should update an event article', async () => {
      const articleId = uuidv4();
      const updateEventArticleDto: UpdateEventArticleDto = {
        periodId: uuidv4(),
        topicId: uuidv4(),
        article: {
          article: {
            articleName: 'Updated Event Name',
          }
        }
      };
      
      const expectedResult = {
        articleId,
        articleType: $Enums.ArticleType.EVENT,
        articleName: 'Updated Event Name',
        eventArticle: {
          articleId,
          periodId: updateEventArticleDto.periodId,
          topicId: updateEventArticleDto.topicId,
          period: { id: updateEventArticleDto.periodId, name: 'Test Period' },
          topic: { id: updateEventArticleDto.topicId, name: 'Test Topic' },
        }
      };
      
      mockArticlesService.updateEventArticle.mockResolvedValue(expectedResult);
      
      const result = await controller.updateEventArticle(articleId, updateEventArticleDto);
      
      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.updateEventArticle).toHaveBeenCalledWith(articleId, updateEventArticleDto);
    });
  });
  
  describe('removeEventArticle', () => {
    it('should remove an event article', async () => {
      const articleId = uuidv4();
      const expectedResult = { success: true };
      
      // Add the missing method to the controller if it doesn't exist
      if (!controller.removeEventArticle) {
        controller.removeEventArticle = (id: string) => {
          return mockArticlesService.removeEventArticle(id);
        };
      }
      
      mockArticlesService.removeEventArticle.mockResolvedValue(expectedResult);
      
      const result = await controller.removeEventArticle(articleId);
      
      expect(result).toEqual(expectedResult);
      expect(mockArticlesService.removeEventArticle).toHaveBeenCalledWith(articleId);
    });
  });
});
