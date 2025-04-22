import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { CreatePersonArticleDto } from './dto/create-person-article.dto';
import { UpdatePersonArticleDto } from './dto/update-person-article.dto';
import { CreateEventArticleDto } from './dto/create-event-article.dto';
import { UpdateEventArticleDto } from './dto/update-event-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';
import { CreateImageDto } from './dto/image-dto/create-image.dto';
import { UpdateImageDto } from './dto/image-dto/update-image.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';

@Injectable()
export class ArticlesService {
  // Base Article Methods
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: string) {
    return `This action returns a #${id} article`;
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: string) {
    return `This action removes a #${id} article`;
  }

  // Person Article Methods
  createPersonArticle(createPersonArticleDto: CreatePersonArticleDto) {
    return 'This action adds a new person article';
  }

  findAllPersonArticles() {
    return `This action returns all person articles`;
  }

  findOnePersonArticle(id: string) {
    return `This action returns a #${id} person article`;
  }

  updatePersonArticle(id: string, updatePersonArticleDto: UpdatePersonArticleDto) {
    return `This action updates a #${id} person article`;
  }

  removePersonArticle(id: string) {
    return `This action removes a #${id} person article`;
  }

  // Event Article Methods
  createEventArticle(createEventArticleDto: CreateEventArticleDto) {
    return 'This action adds a new event article';
  }

  findAllEventArticles() {
    return `This action returns all event articles`;
  }

  findOneEventArticle(id: string) {
    return `This action returns a #${id} event article`;
  }

  updateEventArticle(id: string, updateEventArticleDto: UpdateEventArticleDto) {
    return `This action updates a #${id} event article`;
  }

  removeEventArticle(id: string) {
    return `This action removes a #${id} event article`;
  }

  // Content Methods
  createContent(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findAllContents() {
    return `This action returns all contents`;
  }

  findOneContent(id: string) {
    return `This action returns a #${id} content`;
  }

  updateContent(id: string, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  removeContent(id: string) {
    return `This action removes a #${id} content`;
  }

  // Image Methods
  createImage(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAllImages() {
    return `This action returns all images`;
  }

  findOneImage(id: string) {
    return `This action returns a #${id} image`;
  }

  updateImage(id: string, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  removeImage(id: string) {
    return `This action removes a #${id} image`;
  }
}
