import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';
import { UpdateEventArticleDto } from './dto/update-event-article.dto';
import { UpdatePersonArticleDto } from './dto/update-person-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService
  ) {}

  // Article CRUD
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.prisma.article.create({
      data: {
        articleId:uuidv4(),
        articleType: createArticleDto.articleType,
        articleName: createArticleDto.articleName,
        articleContentList:{}
      },
    });

    // Nếu có nội dung thì đệ quy tạo cây content
    if (createArticleDto.contents && createArticleDto.contents.length > 0) {
      for (const contentDto of createArticleDto.contents) {
        await this.createContentRecursive(
          contentDto,
          newArticle.articleId,
          null,
        );
      }
    }

    return newArticle;
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
        take: limitNum,
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
    allContents.forEach((content) => {
      contentMap.set(content.contentId, {
        ...content,
        children: [],
      });
    });

    // Organize contents into parent-child relationships
    allContents.forEach((content) => {
      if (content.parentId && contentMap.has(content.parentId)) {
        const parent = contentMap.get(content.parentId);
        parent.children.push(contentMap.get(content.contentId));
      }
    });

    // Replace the flat contents with the hierarchical structure
    article.contents = article.contents.map((content) => {
      return contentMap.get(content.contentId);
    });

    // Helper function to clean empty arrays and null values
    const cleanEmptyValues = (obj) => {
      if (obj === null || typeof obj !== 'object') return obj;

      // Handle arrays
      if (Array.isArray(obj)) {
        // Clean each item in the array
        const cleanedArray = obj
          .map((item) => cleanEmptyValues(item))
          .filter(Boolean);
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
          .articleType as $Enums.ArticleType;
      }

      if (updateArticleDto.article?.articleName) {
        updateData.articleName = updateArticleDto.article.articleName;
      }

      

      return await this.prisma.article.update({
        where: { articleId: id },
        data: updateData,
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  // Update a person article and its base article
  async updatePersonArticle(id: string, updatePersonArticleDto: UpdatePersonArticleDto) {
    try {
      // First check if the article exists and is a PERSON type
      const article = await this.prisma.article.findUnique({
        where: { articleId: id },
      });

      if (!article) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }

      if (article.articleType !== 'PERSON') {
        throw new BadRequestException(`Article with ID ${id} is not a PERSON article`);
      }

      // Start a transaction to update both the article and person article
      const result = await this.prisma.$transaction(async (prisma) => {
        // Update the base article if provided
        if (updatePersonArticleDto.article) {
          const updateData: any = {};

          if (updatePersonArticleDto.article.article?.articleName) {
            updateData.articleName = updatePersonArticleDto.article.article.articleName;
          }

          // if (updatePersonArticleDto.article.article?.articleContentList) {
          //   updateData.articleContentList = updatePersonArticleDto.article.article.articleContentList;
          // }

          await prisma.article.update({
            where: { articleId: id },
            data: updateData,
          });
        }

        // Update the person article
        const personUpdateData: any = {};
        let hasPersonUpdates = false;

        if (updatePersonArticleDto.personName !== undefined) {
          personUpdateData.personName = updatePersonArticleDto.personName;
          hasPersonUpdates = true;
        }

        if (updatePersonArticleDto.personAvatar !== undefined) {
          personUpdateData.personAvatar = updatePersonArticleDto.personAvatar;
          hasPersonUpdates = true;
        }

        if (updatePersonArticleDto.birthYear !== undefined) {
          personUpdateData.birthYear = updatePersonArticleDto.birthYear;
          hasPersonUpdates = true;
        }

        if (updatePersonArticleDto.deathYear !== undefined) {
          personUpdateData.deathYear = updatePersonArticleDto.deathYear;
          hasPersonUpdates = true;
        }

        if (updatePersonArticleDto.nationality !== undefined) {
          personUpdateData.nationality = updatePersonArticleDto.nationality;
          hasPersonUpdates = true;
        }

        if (hasPersonUpdates) {
          await prisma.personArticle.update({
            where: { articleId: id },
            data: personUpdateData,
          });
        }

        // Get the updated article with person details
        return await prisma.article.findUnique({
          where: { articleId: id },
          include: {
            personArticle: true,
          },
        });
      });

      return result;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(`Failed to update person article: ${error.message}`);
    }
  }

  // Update an event article and its base article
  async updateEventArticle(id: string, updateEventArticleDto: UpdateEventArticleDto) {
    try {
      // First check if the article exists and is an EVENT type
      const article = await this.prisma.article.findUnique({
        where: { articleId: id },
      });

      if (!article) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }

      if (article.articleType !== 'EVENT') {
        throw new BadRequestException(`Article with ID ${id} is not an EVENT article`);
      }

      // Start a transaction to update both the article and event article
      const result = await this.prisma.$transaction(async (prisma) => {
        // Update the base article if provided
        if (updateEventArticleDto.article) {
          const updateData: any = {};

          if (updateEventArticleDto.article.article?.articleName) {
            updateData.articleName = updateEventArticleDto.article.article.articleName;
          }

          // if (updateEventArticleDto.article.article?.articleContentList) {
          //   updateData.articleContentList = updateEventArticleDto.article.article.articleContentList;
          // }

          await prisma.article.update({
            where: { articleId: id },
            data: updateData,
          });
        }

        // Update the event article
        const eventUpdateData: any = {};
        let hasEventUpdates = false;

        if (updateEventArticleDto.periodId !== undefined) {
          eventUpdateData.periodId = updateEventArticleDto.periodId;
          hasEventUpdates = true;
        }

        if (updateEventArticleDto.topicId !== undefined) {
          eventUpdateData.topicId = updateEventArticleDto.topicId;
          hasEventUpdates = true;
        }

        if (hasEventUpdates) {
          await prisma.eventArticle.update({
            where: { articleId: id },
            data: eventUpdateData,
          });
        }

        // Get the updated article with event details
        return await prisma.article.findUnique({
          where: { articleId: id },
          include: {
            eventArticle: {
              include: {
                period: true,
                topic: true,
              },
            },
          },
        });
      });

      return result;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(`Failed to update event article: ${error.message}`);
    }
  }

  // Remove a person article and its base article
  async removePersonArticle(id: string) {
    try {
      // First check if the article exists and is a PERSON type
      const article = await this.prisma.article.findUnique({
        where: { articleId: id },
      });

      if (!article) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }

      if (article.articleType !== 'PERSON') {
        throw new BadRequestException(`Article with ID ${id} is not a PERSON article`);
      }

      // Use the general remove method to handle the deletion
      // This will delete the base article and all related content
      // The person article will be deleted by cascade
      return this.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(`Failed to delete person article: ${error.message}`);
    }
  }

  // Remove an event article and its base article
  async removeEventArticle(id: string) {
    try {
      // First check if the article exists and is an EVENT type
      const article = await this.prisma.article.findUnique({
        where: { articleId: id },
      });

      if (!article) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }

      if (article.articleType !== 'EVENT') {
        throw new BadRequestException(`Article with ID ${id} is not an EVENT article`);
      }

      // Use the general remove method to handle the deletion
      // This will delete the base article and all related content
      // The event article will be deleted by cascade
      return this.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(`Failed to delete event article: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      // First check if the article exists and get its type
      const article = await this.prisma.article.findUnique({
        where: { articleId: id },
        include: {
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

      // Start a transaction to delete all related data
      await this.prisma.$transaction(async (prisma) => {
        // 1. Delete all images from Supabase storage
        for (const content of article.contents) {
          for (const image of content.images) {
            try {
              // Extract the path from the URL
              const url = new URL(image.src);
              const pathParts = url.pathname.split('/');
              const bucket = 'images';
              const path = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/');
              
              // Delete from Supabase storage
              await this.supabaseService.deleteFile(bucket, path);
            } catch (error) {
              console.error(`Failed to delete image from storage: ${error.message}`);
              // Continue with deletion even if storage deletion fails
            }
          }
        }

        // 2. Delete all images from the database
        for (const content of article.contents) {
          if (content.images.length > 0) {
            await prisma.image.deleteMany({
              where: {
                contentId: {
                  in: content.images.map(image => image.imageId),
                },
              },
            });
          }
        }

        // 3. Delete all contents
        await prisma.content.deleteMany({
          where: {
            articleId: id,
          },
        });

        // 4. Delete the specific article type (person or event)
        if (article.articleType === 'PERSON') {
          await prisma.personArticle.delete({
            where: { articleId: id },
          });
        } else if (article.articleType === 'EVENT') {
          await prisma.eventArticle.delete({
            where: { articleId: id },
          });
        }

        // 5. Finally delete the base article
        await prisma.article.delete({
          where: { articleId: id },
        });
      });

      return { message: `Article with ID ${id} and all related data successfully deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Failed to delete article: ${error.message}`);
    }
  }

  async getAllArticleNames() {
    const articles = await this.prisma.article.findMany({
      select: { articleId: true, articleName: true },
    });
    return articles;
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
  private async createContentRecursive(
    dto: CreateContentDto,
    articleId: string,
    parentId: string | null,
  ) {
    const newContent = await this.prisma.content.create({
      data: {
        contentId: uuidv4(),
        contentName: dto.contentName,
        content: dto.content,
        articleId,
        parentId,
        imagesId:{},
        images: dto.images
          ? {
              createMany: {
                data: dto.images.map((img) => ({
                  imageId: img.imageId || uuidv4(),
                  src: img.src,
                  alt: img.alt,
                  caption: img.caption,
                  width: img.width,
                  height: img.height,
                })),
              },
            }
          : undefined,
      },
    });

    if (dto.children && dto.children.length > 0) {
      for (const child of dto.children) {
        await this.createContentRecursive(
          child,
          articleId,
          newContent.contentId,
        );
      }
    }

    return newContent;
  }
}
