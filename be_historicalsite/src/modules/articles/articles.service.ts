import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArticleType } from '../../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // Article CRUD
  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        articleId: uuidv4(),
        articleType: createArticleDto.articleType,
        articleName: createArticleDto.articleName,
        articleContentList: createArticleDto.articleContentList || {}
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, articleType } = paginationDto;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause for filtering
    const where = articleType ? { articleType } : {};

    // Conditionally build include object based on articleType
    let include: any = {
      contents: {
        include: {
          images: true,
        },
      },
    };

    // Only include the relevant article type data
    if (!articleType || articleType === 'EVENT') {
      include.eventArticle = {
        include: {
          article: true,
        },
      };
    }

    if (!articleType || articleType === 'PERSON') {
      include.personArticle = {
        include: {
          article: true,
        },
      };
    }
    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: limitNum
      }),
      this.prisma.article.count({ where }),
    ]);
    

    return {
      data: articles,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  async findOne(id: string) {
    // First, fetch the article with its top-level contents
    const article = await this.prisma.article.findUnique({
      where: { articleId: id },
      include: {
        contents: {
          where: { parentId: null }, // Only get top-level contents
          include: {
            images: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    
    // Get all contents for this article to build the hierarchy
    const allContents = await this.prisma.content.findMany({
      where: { articleId: id },
      include: {
        images: true,
      },
    });
    
    // Build content hierarchy
    const contentMap = new Map();
    allContents.forEach(content => {
      contentMap.set(content.contentId, {
        ...content,
        children: [],
      });
    });
    
    // Organize contents into parent-child relationships
    allContents.forEach(content => {
      if (content.parentId && contentMap.has(content.parentId)) {
        const parent = contentMap.get(content.parentId);
        parent.children.push(contentMap.get(content.contentId));
      }
    });
    
    // Replace the flat contents with the hierarchical structure
    article.contents = article.contents.map(content => {
      return contentMap.get(content.contentId);
    });
    
    // Helper function to clean empty arrays and null values
    const cleanEmptyValues = (obj) => {
      if (obj === null || typeof obj !== 'object') return obj;
      
      // Handle arrays
      if (Array.isArray(obj)) {
        // Clean each item in the array
        const cleanedArray = obj.map(item => cleanEmptyValues(item)).filter(Boolean);
        return cleanedArray.length ? cleanedArray : undefined;
      }
      
      // Handle objects
      const result = {};
      for (const key in obj) {
        const value = cleanEmptyValues(obj[key]);
        // Only include non-null, non-undefined values and non-empty arrays
        if (value !== null && value !== undefined) {
          if (!Array.isArray(value) || value.length > 0) {
            result[key] = value;
          }
        }
      }
      return Object.keys(result).length ? result : undefined;
    };
    
    // Clean the article object
    const cleanedArticle = cleanEmptyValues(article);
    
    // Get additional data based on article type
    if (article.articleType === 'EVENT') {
      const eventArticle = await this.prisma.eventArticle.findUnique({
        where: { articleId: id },
        include: {
          period: true,
          topic: true,
        },
      });
      return cleanEmptyValues({ ...cleanedArticle, eventArticle });
    } else if (article.articleType === 'PERSON') {
      const personArticle = await this.prisma.personArticle.findUnique({
        where: { articleId: id },
      });
      return cleanEmptyValues({ ...cleanedArticle, personArticle });
    }

    return cleanedArticle;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      const updateData: any = {};

      if (updateArticleDto.article?.articleType) {
        updateData.articleType = updateArticleDto.article
          .articleType as ArticleType;
      }

      if (updateArticleDto.article?.articleName) {
        updateData.articleName = updateArticleDto.article.articleName;
      }

      if (updateArticleDto.article?.articleContentList) {
        updateData.articleContentList =
          updateArticleDto.article.articleContentList;
      }

      return await this.prisma.article.update({
        where: { articleId: id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.article.delete({
        where: { articleId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  async getAllArticleNames() {
    const articles = await this.prisma.article.findMany({
      select: { articleId: true, articleName: true },
      
    });
    return articles;
  }

  // Content CRUD
  async createContent(createContentDto: CreateContentDto) {
    return this.prisma.content.create({
      data: {
        contentId: uuidv4(),
        contentName: createContentDto.contentName,
        articleId: createContentDto.articleId,
        parentId: createContentDto.parentId,
        content: createContentDto.content,
        imagesId: createContentDto.imagesId || {}
      },
    });
  }


  async updateContent(id: string, updateContentDto: UpdateContentDto) {
    try {
      return await this.prisma.content.update({
        where: { contentId: id },
        data: updateContentDto,
      });
    } catch (error) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }

  async removeContent(id: string) {
    try {
      return await this.prisma.content.delete({
        where: { contentId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }

}
