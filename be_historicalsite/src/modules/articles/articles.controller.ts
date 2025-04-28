import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Article endpoints
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles.' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by id' })
  @ApiResponse({ status: 200, description: 'Return the article.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an article' })
  @ApiResponse({ status: 204, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  // Content endpoints
  @Post('content')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new content' })
  @ApiResponse({ status: 201, description: 'The content has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createContent(@Body() createContentDto: CreateContentDto) {
    return this.articlesService.createContent(createContentDto);
  }

  @Get('content')
  @ApiOperation({ summary: 'Get all contents' })
  @ApiResponse({ status: 200, description: 'Return all contents.' })
  findAllContents() {
    return this.articlesService.findAllContents();
  }

  @Get('content/:id')
  @ApiOperation({ summary: 'Get a content by id' })
  @ApiResponse({ status: 200, description: 'Return the content.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  findOneContent(@Param('id') id: string) {
    return this.articlesService.findOneContent(id);
  }

  @Patch('content/:id')
  @ApiOperation({ summary: 'Update a content' })
  @ApiResponse({ status: 200, description: 'The content has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  updateContent(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.articlesService.updateContent(id, updateContentDto);
  }

  @Delete('content/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a content' })
  @ApiResponse({ status: 204, description: 'The content has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  removeContent(@Param('id') id: string) {
    return this.articlesService.removeContent(id);
  }

  // Image endpoints
  @Post('image')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new image' })
  @ApiResponse({ status: 201, description: 'The image has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createImage(@Body() createImageDto: CreateImageDto) {
    return this.articlesService.createImage(createImageDto);
  }

  @Get('image')
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'Return all images.' })
  findAllImages() {
    return this.articlesService.findAllImages();
  }

  @Get('image/:id')
  @ApiOperation({ summary: 'Get an image by id' })
  @ApiResponse({ status: 200, description: 'Return the image.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  findOneImage(@Param('id') id: string) {
    return this.articlesService.findOneImage(id);
  }

  @Patch('image/:id')
  @ApiOperation({ summary: 'Update an image' })
  @ApiResponse({ status: 200, description: 'The image has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  updateImage(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.articlesService.updateImage(id, updateImageDto);
  }

  @Delete('image/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an image' })
  @ApiResponse({ status: 204, description: 'The image has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  removeImage(@Param('id') id: string) {
    return this.articlesService.removeImage(id);
  }

  // Person Article endpoints
  @Post('person')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new person article' })
  @ApiResponse({ status: 201, description: 'The person article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createPersonArticle(@Body() createPersonArticleDto: CreatePersonArticleDto) {
    return this.articlesService.createPersonArticle(createPersonArticleDto);
  }

  @Get('person')
  @ApiOperation({ summary: 'Get all person articles' })
  @ApiResponse({ status: 200, description: 'Return all person articles.' })
  findAllPersonArticles() {
    return this.articlesService.findAllPersonArticles();
  }

  @Get('person/:id')
  @ApiOperation({ summary: 'Get a person article by id' })
  @ApiResponse({ status: 200, description: 'Return the person article.' })
  @ApiResponse({ status: 404, description: 'Person article not found.' })
  findOnePersonArticle(@Param('id') id: string) {
    return this.articlesService.findOnePersonArticle(id);
  }

  @Patch('person/:id')
  @ApiOperation({ summary: 'Update a person article' })
  @ApiResponse({ status: 200, description: 'The person article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Person article not found.' })
  updatePersonArticle(@Param('id') id: string, @Body() updatePersonArticleDto: UpdatePersonArticleDto) {
    return this.articlesService.updatePersonArticle(id, updatePersonArticleDto);
  }

  @Delete('person/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a person article' })
  @ApiResponse({ status: 204, description: 'The person article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Person article not found.' })
  removePersonArticle(@Param('id') id: string) {
    return this.articlesService.removePersonArticle(id);
  }

  // Event Article endpoints
  @Post('event')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new event article' })
  @ApiResponse({ status: 201, description: 'The event article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createEventArticle(@Body() createEventArticleDto: CreateEventArticleDto) {
    return this.articlesService.createEventArticle(createEventArticleDto);
  }

  @Get('event')
  @ApiOperation({ summary: 'Get all event articles' })
  @ApiResponse({ status: 200, description: 'Return all event articles.' })
  findAllEventArticles() {
    return this.articlesService.findAllEventArticles();
  }

  @Get('event/:id')
  @ApiOperation({ summary: 'Get an event article by id' })
  @ApiResponse({ status: 200, description: 'Return the event article.' })
  @ApiResponse({ status: 404, description: 'Event article not found.' })
  findOneEventArticle(@Param('id') id: string) {
    return this.articlesService.findOneEventArticle(id);
  }

  @Patch('event/:id')
  @ApiOperation({ summary: 'Update an event article' })
  @ApiResponse({ status: 200, description: 'The event article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Event article not found.' })
  updateEventArticle(@Param('id') id: string, @Body() updateEventArticleDto: UpdateEventArticleDto) {
    return this.articlesService.updateEventArticle(id, updateEventArticleDto);
  }

  @Delete('event/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an event article' })
  @ApiResponse({ status: 204, description: 'The event article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Event article not found.' })
  removeEventArticle(@Param('id') id: string) {
    return this.articlesService.removeEventArticle(id);
  }
}
