import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';

import { CreatePersonArticleDto } from './dto/create-person-article.dto';
import { UpdatePersonArticleDto } from './dto/update-person-article.dto';
import { CreateEventArticleDto } from './dto/create-event-article.dto';
import { UpdateEventArticleDto } from './dto/update-event-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';

import { CreateImageDto } from './dto/image-dto/create-image.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';
import { UpdateImageDto } from './dto/image-dto/update-image.dto';


@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Base Article Routes
  @ApiOperation({ summary: 'Create a new article' })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiOperation({ summary: 'Get all articles' })
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific article by ID' })
  @ApiParam({ name: 'id', description: 'Article ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a specific article' })
  @ApiParam({ name: 'id', description: 'Article ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @ApiOperation({ summary: 'Delete a specific article' })
  @ApiParam({ name: 'id', description: 'Article ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  // Person Article Routes
  @ApiOperation({ summary: 'Create a new person article' })
  @Post('person')
  createPersonArticle(@Body() createPersonArticleDto: CreatePersonArticleDto) {
    return this.articlesService.createPersonArticle(createPersonArticleDto);
  }

  @ApiOperation({ summary: 'Get all person articles' })
  @Get('person')
  findAllPersonArticles() {
    return this.articlesService.findAllPersonArticles();
  }

  @ApiOperation({ summary: 'Get a specific person article by ID' })
  @ApiParam({ name: 'id', description: 'Person Article ID' })
  @Get('person/:id')
  findOnePersonArticle(@Param('id') id: string) {
    return this.articlesService.findOnePersonArticle(id);
  }

  @ApiOperation({ summary: 'Update a specific person article' })
  @ApiParam({ name: 'id', description: 'Person Article ID' })
  @Patch('person/:id')
  updatePersonArticle(@Param('id') id: string, @Body() updatePersonArticleDto: UpdatePersonArticleDto) {
    return this.articlesService.updatePersonArticle(id, updatePersonArticleDto);
  }

  @ApiOperation({ summary: 'Delete a specific person article' })
  @ApiParam({ name: 'id', description: 'Person Article ID' })
  @Delete('person/:id')
  removePersonArticle(@Param('id') id: string) {
    return this.articlesService.removePersonArticle(id);
  }

  // Event Article Routes
  @ApiOperation({ summary: 'Create a new event article' })
  @Post('event')
  createEventArticle(@Body() createEventArticleDto: CreateEventArticleDto) {
    return this.articlesService.createEventArticle(createEventArticleDto);
  }

  @ApiOperation({ summary: 'Get all event articles' })
  @Get('event')
  findAllEventArticles() {
    return this.articlesService.findAllEventArticles();
  }

  @ApiOperation({ summary: 'Get a specific event article by ID' })
  @ApiParam({ name: 'id', description: 'Event Article ID' })
  @Get('event/:id')
  findOneEventArticle(@Param('id') id: string) {
    return this.articlesService.findOneEventArticle(id);
  }

  @ApiOperation({ summary: 'Update a specific event article' })
  @ApiParam({ name: 'id', description: 'Event Article ID' })
  @Patch('event/:id')
  updateEventArticle(@Param('id') id: string, @Body() updateEventArticleDto: UpdateEventArticleDto) {
    return this.articlesService.updateEventArticle(id, updateEventArticleDto);
  }

  @ApiOperation({ summary: 'Delete a specific event article' })
  @ApiParam({ name: 'id', description: 'Event Article ID' })
  @Delete('event/:id')
  removeEventArticle(@Param('id') id: string) {
    return this.articlesService.removeEventArticle(id);
  }

  // Content Routes
  @ApiOperation({ summary: 'Create a new content' })
  @Post('content')
  createContent(@Body() createContentDto: CreateContentDto) {
    return this.articlesService.createContent(createContentDto);
  }

  @ApiOperation({ summary: 'Get all contents' })
  @Get('content')
  findAllContents() {
    return this.articlesService.findAllContents();
  }

  @ApiOperation({ summary: 'Get contents by article ID' })
  @ApiParam({ name: 'articleId', description: 'Article ID' })
  @Get('content/article/:articleId')
  findContentsByArticle(@Param('articleId') articleId: string) {
    // This would need implementation in the service
    return `This action returns all contents for article #${articleId}`;
  }

  @ApiOperation({ summary: 'Get a specific content by ID' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  @Get('content/:id')
  findOneContent(@Param('id') id: string) {
    return this.articlesService.findOneContent(id);
  }

  @ApiOperation({ summary: 'Update a specific content' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  @Patch('content/:id')
  updateContent(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.articlesService.updateContent(id, updateContentDto);
  }

  @ApiOperation({ summary: 'Delete a specific content' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  @Delete('content/:id')
  removeContent(@Param('id') id: string) {
    return this.articlesService.removeContent(id);
  }

  // Image Routes
  @ApiOperation({ summary: 'Create a new image' })
  @Post('image')
  createImage(@Body() createImageDto: CreateImageDto) {
    return this.articlesService.createImage(createImageDto);
  }

  @ApiOperation({ summary: 'Get all images' })
  @Get('image')
  findAllImages() {
    return this.articlesService.findAllImages();
  }

  @ApiOperation({ summary: 'Get images by content ID' })
  @ApiParam({ name: 'contentId', description: 'Content ID' })
  @Get('image/content/:contentId')
  findImagesByContent(@Param('contentId') contentId: string) {
    // This would need implementation in the service
    return `This action returns all images for content #${contentId}`;
  }

  @ApiOperation({ summary: 'Get a specific image by ID' })
  @ApiParam({ name: 'id', description: 'Image ID' })
  @Get('image/:id')
  findOneImage(@Param('id') id: string) {
    return this.articlesService.findOneImage(id);
  }

  @ApiOperation({ summary: 'Update a specific image' })
  @ApiParam({ name: 'id', description: 'Image ID' })
  @Patch('image/:id')
  updateImage(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.articlesService.updateImage(id, updateImageDto);
  }

  @ApiOperation({ summary: 'Delete a specific image' })
  @ApiParam({ name: 'id', description: 'Image ID' })
  @Delete('image/:id')
  removeImage(@Param('id') id: string) {
    return this.articlesService.removeImage(id);
  }
}
