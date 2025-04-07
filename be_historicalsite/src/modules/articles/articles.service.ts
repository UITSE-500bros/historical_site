import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.articles.create({
      data: createArticleDto,
      include: {
        period: true,
        topic: true,
      },
    });
  }

  async findAll() {
    return this.prisma.articles.findMany({
      include: {
        period: true,
        topic: true,
      },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.articles.findUnique({
      where: { article_id: id },
      include: {
        period: true,
        topic: true,
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      return await this.prisma.articles.update({
        where: { article_id: id },
        data: updateArticleDto,
        include: {
          period: true,
          topic: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.articles.delete({
        where: { article_id: id },
        include: {
          period: true,
          topic: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}
