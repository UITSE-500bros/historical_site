import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  const mockArticlesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockArticle = {
    article_id: '123e4567-e89b-12d3-a456-426614174000',
    article_name: 'The Renaissance Art',
    article_content: 'Content about Renaissance art',
    article_type: 'Event',
    created_at: new Date(),
    updated_at: new Date(),
    images_list: ['image1.jpg', 'image2.jpg'],
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      mockArticlesService.create.mockResolvedValue(mockArticle);

      const result = await controller.create(createArticleDto);

      expect(service.create).toHaveBeenCalledWith(createArticleDto);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      mockArticlesService.findAll.mockResolvedValue([mockArticle]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('findOne', () => {
    it('should return an article by id', async () => {
      mockArticlesService.findOne.mockResolvedValue(mockArticle);

      const result = await controller.findOne(mockArticle.article_id);

      expect(service.findOne).toHaveBeenCalledWith(mockArticle.article_id);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const updateArticleDto: UpdateArticleDto = { article_name: 'Updated Article' };
      const updatedArticle = {
        ...mockArticle,
        article_name: 'Updated Article',
      };
      mockArticlesService.update.mockResolvedValue(updatedArticle);

      const result = await controller.update(mockArticle.article_id, updateArticleDto);

      expect(service.update).toHaveBeenCalledWith(mockArticle.article_id, updateArticleDto);
      expect(result).toEqual(updatedArticle);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      mockArticlesService.remove.mockResolvedValue(mockArticle);

      const result = await controller.remove(mockArticle.article_id);

      expect(service.remove).toHaveBeenCalledWith(mockArticle.article_id);
      expect(result).toEqual(mockArticle);
    });
  });
});
