import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article-dto/create-article.dto';
import { PaginationDto } from './dto/article-dto/pagination.dto';
import { UpdateArticleDto } from './dto/article-dto/update-article.dto';
import { CreateContentDto } from './dto/content-dto/create-content.dto';
import { UpdateContentDto } from './dto/content-dto/update-content.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles with pagination and optional filtering' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (1-based)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'articleType', required: false, enum: ['EVENT', 'PERSON'], description: 'Filter by article type (EVENT or PERSON)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return paginated articles with metadata.',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Article' }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.articlesService.findAll(paginationDto);
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

}
