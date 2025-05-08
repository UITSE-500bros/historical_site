import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';
import { CreateImageDto } from './dto/image-dto/create-image.dto';
import { UpdateImageDto } from './dto/image-dto/update-image.dto';
import { CreatePersonArticleDto } from './dto/create-person-article.dto';
import { UpdatePersonArticleDto } from './dto/update-person-article.dto';
import { CreateEventArticleDto } from './dto/create-event-article.dto';
import { UpdateEventArticleDto } from './dto/update-event-article.dto';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { ArticleType } from '../../../generated/prisma/client';
import { v4 as uuidv4 } from 'uuid';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  // Mock service methods
  const mockArticlesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createContent: jest.fn(),
    findAllContents: jest.fn(),
    findOneContent: jest.fn(),
    updateContent: jest.fn(),
    removeContent: jest.fn(),
    createImage: jest.fn(),
    findAllImages: jest.fn(),
    findOneImage: jest.fn(),
    updateImage: jest.fn(),
    removeImage: jest.fn(),
    createPersonArticle: jest.fn(),
    findAllPersonArticles: jest.fn(),
    findOnePersonArticle: jest.fn(),
    updatePersonArticle: jest.fn(),
    removePersonArticle: jest.fn(),
    createEventArticle: jest.fn(),
    findAllEventArticles: jest.fn(),
    findOneEventArticle: jest.fn(),
    updateEventArticle: jest.fn(),
    removeEventArticle: jest.fn(),
  };

  beforeEach(async () => {
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
    service = module.get<ArticlesService>(ArticlesService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Article endpoints tests
  describe('Article endpoints', () => {
    describe('create', () => {
      it('should create a new article', async () => {
        const createArticleDto: CreateArticleDto = {
          articleType: ArticleType.EVENT,
          articleName: 'Test Article',
          articleContentList: {},
        };

        const expectedResult = {
          articleId: uuidv4(),
          ...createArticleDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.create.mockResolvedValue(expectedResult);

        const result = await controller.create(createArticleDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.create).toHaveBeenCalledWith(createArticleDto);
      });
    });

    describe('findAll', () => {
      it('should return paginated articles', async () => {
        const paginationDto: PaginationDto = {
          page: 1,
          limit: 10,
        };

        const expectedResult = {
          data: [
            {
              articleId: uuidv4(),
              articleType: ArticleType.EVENT,
              articleName: 'Test Article',
              articleContentList: {},
              createdAt: new Date(),
              updatedAt: new Date(),
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

    describe('findOne', () => {
      it('should return an article by id', async () => {
        const articleId = uuidv4();
        const expectedResult = {
          articleId,
          articleType: ArticleType.EVENT,
          articleName: 'Test Article',
          articleContentList: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.findOne.mockResolvedValue(expectedResult);

        const result = await controller.findOne(articleId);

        expect(result).toEqual(expectedResult);
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

        const expectedResult = {
          articleId,
          articleType: ArticleType.EVENT,
          articleName: 'Updated Article',
          articleContentList: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.update.mockResolvedValue(expectedResult);

        const result = await controller.update(articleId, updateArticleDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.update).toHaveBeenCalledWith(articleId, updateArticleDto);
      });
    });

    describe('remove', () => {
      it('should remove an article', async () => {
        const articleId = uuidv4();
        mockArticlesService.remove.mockResolvedValue(undefined);

        const result = await controller.remove(articleId);

        expect(result).toBeUndefined();
        expect(mockArticlesService.remove).toHaveBeenCalledWith(articleId);
      });
    });
  });

  // Content endpoints tests
  describe('Content endpoints', () => {
    describe('createContent', () => {
      it('should create a new content', async () => {
        const createContentDto: CreateContentDto = {
          contentName: 'Test Content',
          articleId: uuidv4(),
          content: 'Test content text',
          imagesId: {},
        };

        const expectedResult = {
          contentId: uuidv4(),
          ...createContentDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.createContent.mockResolvedValue(expectedResult);

        const result = await controller.createContent(createContentDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.createContent).toHaveBeenCalledWith(createContentDto);
      });
    });

    describe('findAllContents', () => {
      it('should return all contents', async () => {
        const expectedResult = [
          {
            contentId: uuidv4(),
            contentName: 'Test Content',
            articleId: uuidv4(),
            content: 'Test content text',
            imagesId: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        mockArticlesService.findAllContents.mockResolvedValue(expectedResult);

        const result = await controller.findAllContents();

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findAllContents).toHaveBeenCalled();
      });
    });

    describe('findOneContent', () => {
      it('should return a content by id', async () => {
        const contentId = uuidv4();
        const expectedResult = {
          contentId,
          contentName: 'Test Content',
          articleId: uuidv4(),
          content: 'Test content text',
          imagesId: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.findOneContent.mockResolvedValue(expectedResult);

        const result = await controller.findOneContent(contentId);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findOneContent).toHaveBeenCalledWith(contentId);
      });
    });

    describe('updateContent', () => {
      it('should update a content', async () => {
        const contentId = uuidv4();
        const updateContentDto: UpdateContentDto = {
          contentName: 'Updated Content',
        };

        const expectedResult = {
          contentId,
          contentName: 'Updated Content',
          articleId: uuidv4(),
          content: 'Test content text',
          imagesId: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.updateContent.mockResolvedValue(expectedResult);

        const result = await controller.updateContent(contentId, updateContentDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.updateContent).toHaveBeenCalledWith(contentId, updateContentDto);
      });
    });

    describe('removeContent', () => {
      it('should remove a content', async () => {
        const contentId = uuidv4();
        mockArticlesService.removeContent.mockResolvedValue(undefined);

        const result = await controller.removeContent(contentId);

        expect(result).toBeUndefined();
        expect(mockArticlesService.removeContent).toHaveBeenCalledWith(contentId);
      });
    });
  });

  // Image endpoints tests
  describe('Image endpoints', () => {
    describe('createImage', () => {
      it('should create a new image', async () => {
        const createImageDto: CreateImageDto = {
          src: 'test.jpg',
          alt: 'Test Image',
          caption: 'Test Caption',
          width: 100,
          height: 100,
        };

        const expectedResult = {
          imageId: uuidv4(),
          ...createImageDto,
          contentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.createImage.mockResolvedValue(expectedResult);

        const result = await controller.createImage(createImageDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.createImage).toHaveBeenCalledWith(createImageDto);
      });
    });

    describe('findAllImages', () => {
      it('should return all images', async () => {
        const expectedResult = [
          {
            imageId: uuidv4(),
            src: 'test.jpg',
            alt: 'Test Image',
            caption: 'Test Caption',
            width: 100,
            height: 100,
            contentId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        mockArticlesService.findAllImages.mockResolvedValue(expectedResult);

        const result = await controller.findAllImages();

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findAllImages).toHaveBeenCalled();
      });
    });

    describe('findOneImage', () => {
      it('should return an image by id', async () => {
        const imageId = uuidv4();
        const expectedResult = {
          imageId,
          src: 'test.jpg',
          alt: 'Test Image',
          caption: 'Test Caption',
          width: 100,
          height: 100,
          contentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.findOneImage.mockResolvedValue(expectedResult);

        const result = await controller.findOneImage(imageId);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findOneImage).toHaveBeenCalledWith(imageId);
      });
    });

    describe('updateImage', () => {
      it('should update an image', async () => {
        const imageId = uuidv4();
        const updateImageDto: UpdateImageDto = {
          caption: 'Updated Caption',
        };

        const expectedResult = {
          imageId,
          src: 'test.jpg',
          alt: 'Test Image',
          caption: 'Updated Caption',
          width: 100,
          height: 100,
          contentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.updateImage.mockResolvedValue(expectedResult);

        const result = await controller.updateImage(imageId, updateImageDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.updateImage).toHaveBeenCalledWith(imageId, updateImageDto);
      });
    });

    describe('removeImage', () => {
      it('should remove an image', async () => {
        const imageId = uuidv4();
        mockArticlesService.removeImage.mockResolvedValue(undefined);

        const result = await controller.removeImage(imageId);

        expect(result).toBeUndefined();
        expect(mockArticlesService.removeImage).toHaveBeenCalledWith(imageId);
      });
    });
  });

  // Person Article endpoints tests
  describe('Person Article endpoints', () => {
    describe('createPersonArticle', () => {
      it('should create a new person article', async () => {
        const createPersonArticleDto: CreatePersonArticleDto = {
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

        const expectedResult = {
          articleId: uuidv4(),
          ...createPersonArticleDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.createPersonArticle.mockResolvedValue(expectedResult);

        const result = await controller.createPersonArticle(createPersonArticleDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.createPersonArticle).toHaveBeenCalledWith(createPersonArticleDto);
      });
    });

    describe('findAllPersonArticles', () => {
      it('should return all person articles', async () => {
        const expectedResult = [
          {
            articleId: uuidv4(),
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
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        mockArticlesService.findAllPersonArticles.mockResolvedValue(expectedResult);

        const result = await controller.findAllPersonArticles();

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findAllPersonArticles).toHaveBeenCalled();
      });
    });

    describe('findOnePersonArticle', () => {
      it('should return a person article by id', async () => {
        const articleId = uuidv4();
        const expectedResult = {
          articleId,
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
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.findOnePersonArticle.mockResolvedValue(expectedResult);

        const result = await controller.findOnePersonArticle(articleId);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findOnePersonArticle).toHaveBeenCalledWith(articleId);
      });
    });

    describe('updatePersonArticle', () => {
      it('should update a person article', async () => {
        const articleId = uuidv4();
        const updatePersonArticleDto: UpdatePersonArticleDto = {
          personName: 'Updated Person',
        };

        const expectedResult = {
          articleId,
          article: {
            articleType: ArticleType.PERSON,
            articleName: 'Test Person Article',
            articleContentList: {},
          },
          personName: 'Updated Person',
          personAvatar: 'avatar.jpg',
          birthYear: 1900,
          deathYear: 2000,
          nationality: 'Test Nationality',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.updatePersonArticle.mockResolvedValue(expectedResult);

        const result = await controller.updatePersonArticle(articleId, updatePersonArticleDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.updatePersonArticle).toHaveBeenCalledWith(articleId, updatePersonArticleDto);
      });
    });

    describe('removePersonArticle', () => {
      it('should remove a person article', async () => {
        const articleId = uuidv4();
        mockArticlesService.removePersonArticle.mockResolvedValue(undefined);

        const result = await controller.removePersonArticle(articleId);

        expect(result).toBeUndefined();
        expect(mockArticlesService.removePersonArticle).toHaveBeenCalledWith(articleId);
      });
    });
  });

  // Event Article endpoints tests
  describe('Event Article endpoints', () => {
    describe('createEventArticle', () => {
      it('should create a new event article', async () => {
        const createEventArticleDto: CreateEventArticleDto = {
          article: {
            articleType: ArticleType.EVENT,
            articleName: 'Test Event Article',
            articleContentList: {},
          },
          periodId: uuidv4(),
          topicId: uuidv4(),
        };

        const expectedResult = {
          articleId: uuidv4(),
          ...createEventArticleDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.createEventArticle.mockResolvedValue(expectedResult);

        const result = await controller.createEventArticle(createEventArticleDto);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.createEventArticle).toHaveBeenCalledWith(createEventArticleDto);
      });
    });

    describe('findAllEventArticles', () => {
      it('should return all event articles', async () => {
        const expectedResult = [
          {
            articleId: uuidv4(),
            article: {
              articleType: ArticleType.EVENT,
              articleName: 'Test Event Article',
              articleContentList: {},
            },
            periodId: uuidv4(),
            topicId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        mockArticlesService.findAllEventArticles.mockResolvedValue(expectedResult);

        const result = await controller.findAllEventArticles();

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findAllEventArticles).toHaveBeenCalled();
      });
    });

    describe('findOneEventArticle', () => {
      it('should return an event article by id', async () => {
        const articleId = uuidv4();
        const expectedResult = {
          articleId,
          article: {
            articleType: ArticleType.EVENT,
            articleName: 'Test Event Article',
            articleContentList: {},
          },
          periodId: uuidv4(),
          topicId: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockArticlesService.findOneEventArticle.mockResolvedValue(expectedResult);

        const result = await controller.findOneEventArticle(articleId);

        expect(result).toEqual(expectedResult);
        expect(mockArticlesService.findOneEventArticle).toHaveBeenCalledWith(articleId);
      });
    });

    describe('updateEventArticle', () => {
      it('should update an event article', async () => {
        const articleId = uuidv4();
        const updateEventArticleDto: UpdateEventArticleDto = {
          periodId: uuidv4(),
        };

        const expectedResult = {
          articleId,
          article: {
            articleType: ArticleType.EVENT,
            articleName: 'Test Event Article',
            articleContentList: {},
          },
          periodId: updateEventArticleDto.periodId,
          topicId: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
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
        mockArticlesService.removeEventArticle.mockResolvedValue(undefined);

        const result = await controller.removeEventArticle(articleId);

        expect(result).toBeUndefined();
        expect(mockArticlesService.removeEventArticle).toHaveBeenCalledWith(articleId);
      });
    });
  });
});
