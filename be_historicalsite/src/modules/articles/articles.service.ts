import { Injectable, NotFoundException } from '@nestjs/common';
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
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { ArticleType } from '../../../prisma/generated/prisma';

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
        articleContentList: createArticleDto.articleContentList || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
      include: {
        personArticle: true,
        eventArticle: {
          include: {
            period: true,
            topic: true,
          },
        },
        contents: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { articleId: id },
      include: {
        personArticle: true,
        eventArticle: {
          include: {
            period: true,
            topic: true,
          },
        },
        contents: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      const updateData: any = {};
      
      if (updateArticleDto.article?.articleType) {
        updateData.articleType = updateArticleDto.article.articleType as ArticleType;
      }
      
      if (updateArticleDto.article?.articleName) {
        updateData.articleName = updateArticleDto.article.articleName;
      }
      
      if (updateArticleDto.article?.articleContentList) {
        updateData.articleContentList = updateArticleDto.article.articleContentList;
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

  // Content CRUD
  async createContent(createContentDto: CreateContentDto) {
    return this.prisma.content.create({
      data: {
        contentId: uuidv4(),
        contentName: createContentDto.contentName,
        articleId: createContentDto.articleId,
        parentId: createContentDto.parentId,
        content: createContentDto.content,
        imagesId: createContentDto.imagesId || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAllContents() {
    return this.prisma.content.findMany({
      include: {
        images: true,
        children: true,
      },
    });
  }

  async findOneContent(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { contentId: id },
      include: {
        images: true,
        children: true,
      },
    });

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
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

  // Image CRUD
  async createImage(createImageDto: CreateImageDto) {
    return this.prisma.image.create({
      data: {
        imageId: uuidv4(),
        contentId: createImageDto.contentId,
        src: createImageDto.src,
        alt: createImageDto.alt,
        caption: createImageDto.caption,
        width: createImageDto.width,
        height: createImageDto.height,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAllImages() {
    return this.prisma.image.findMany();
  }

  async findOneImage(id: string) {
    const image = await this.prisma.image.findUnique({
      where: { imageId: id },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async updateImage(id: string, updateImageDto: UpdateImageDto) {
    try {
      const updateData: any = {};
      
      if (updateImageDto.contentId !== undefined) {
        updateData.contentId = updateImageDto.contentId || null;
      }
      
      if (updateImageDto.src) {
        updateData.src = updateImageDto.src;
      }
      
      if (updateImageDto.alt !== undefined) {
        updateData.alt = updateImageDto.alt;
      }
      
      if (updateImageDto.caption !== undefined) {
        updateData.caption = updateImageDto.caption;
      }
      
      if (updateImageDto.width !== undefined) {
        updateData.width = updateImageDto.width;
      }
      
      if (updateImageDto.height !== undefined) {
        updateData.height = updateImageDto.height;
      }
      
      return await this.prisma.image.update({
        where: { imageId: id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
  }

  async removeImage(id: string) {
    try {
      return await this.prisma.image.delete({
        where: { imageId: id },
      });
    } catch (error) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
  }

  // Person Article CRUD
  async createPersonArticle(createPersonArticleDto: CreatePersonArticleDto) {
    const { article, ...personData } = createPersonArticleDto;
    
    // Create the base article first
    const createdArticle = await this.create(article);
    
    // Then create the person article
    return this.prisma.personArticle.create({
      data: {
        articleId: createdArticle.articleId,
        personName: personData.personName,
        personAvatar: personData.personAvatar || '',
        birthYear: personData.birthYear,
        deathYear: personData.deathYear,
        nationality: personData.nationality,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAllPersonArticles() {
    return this.prisma.personArticle.findMany({
      include: {
        article: true,
      },
    });
  }

  async findOnePersonArticle(id: string) {
    const personArticle = await this.prisma.personArticle.findUnique({
      where: { articleId: id },
      include: {
        article: {
          include: {
            contents: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!personArticle) {
      throw new NotFoundException(`Person Article with ID ${id} not found`);
    }

    return personArticle;
  }

  async updatePersonArticle(id: string, updatePersonArticleDto: UpdatePersonArticleDto) {
    const { article, ...personData } = updatePersonArticleDto;
    
    try {
      // Update the base article if provided
      if (article) {
        await this.update(id, article);
      }
      
      // Update the person article
      const updateData: any = {};
      
      if (personData.personName !== undefined) {
        updateData.personName = personData.personName;
      }
      
      if (personData.birthYear !== undefined) {
        updateData.birthYear = personData.birthYear;
      }
      
      if (personData.deathYear !== undefined) {
        updateData.deathYear = personData.deathYear;
      }
      
      if (personData.nationality !== undefined) {
        updateData.nationality = personData.nationality;
      }
      
      return await this.prisma.personArticle.update({
        where: { articleId: id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Person Article with ID ${id} not found`);
    }
  }

  async removePersonArticle(id: string) {
    try {
      // Delete the person article first
      await this.prisma.personArticle.delete({
        where: { articleId: id },
      });
      
      // Then delete the base article
      return await this.remove(id);
    } catch (error) {
      throw new NotFoundException(`Person Article with ID ${id} not found`);
    }
  }

  // Event Article CRUD
  async createEventArticle(createEventArticleDto: CreateEventArticleDto) {
    const { article, ...eventData } = createEventArticleDto;
    
    // Create the base article first
    const createdArticle = await this.create(article);
    
    // Then create the event article
    return this.prisma.eventArticle.create({
      data: {
        articleId: createdArticle.articleId,
        periodId: eventData.periodId,
        topicId: eventData.topicId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAllEventArticles() {
    return this.prisma.eventArticle.findMany({
      include: {
        article: true,
        period: true,
        topic: true,
      },
    });
  }

  async findOneEventArticle(id: string) {
    const eventArticle = await this.prisma.eventArticle.findUnique({
      where: { articleId: id },
      include: {
        article: {
          include: {
            contents: {
              include: {
                images: true,
              },
            },
          },
        },
        period: true,
        topic: true,
      },
    });

    if (!eventArticle) {
      throw new NotFoundException(`Event Article with ID ${id} not found`);
    }

    return eventArticle;
  }

  async updateEventArticle(id: string, updateEventArticleDto: UpdateEventArticleDto) {
    const { article, ...eventData } = updateEventArticleDto;
    
    try {
      // Update the base article if provided
      if (article) {
        await this.update(id, article);
      }
      
      // Update the event article
      const updateData: any = {};
      
      if (eventData.periodId) {
        updateData.periodId = eventData.periodId;
      }
      
      if (eventData.topicId) {
        updateData.topicId = eventData.topicId;
      }
      
      return await this.prisma.eventArticle.update({
        where: { articleId: id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Event Article with ID ${id} not found`);
    }
  }

  async removeEventArticle(id: string) {
    try {
      // Delete the event article first
      await this.prisma.eventArticle.delete({
        where: { articleId: id },
      });
      
      // Then delete the base article
      return await this.remove(id);
    } catch (error) {
      throw new NotFoundException(`Event Article with ID ${id} not found`);
    }
  }
}
