import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new article',
    description: 'Creates a new article with the provided details.'
  })
  @ApiBody({ 
    type: CreateArticleDto,
    description: 'Article data to create'
  })
  @ApiCreatedResponse({ 
    description: 'The article has been successfully created.',
    type: Article 
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all articles',
    description: 'Retrieves a list of all articles in the system.'
  })
  @ApiOkResponse({ 
    description: 'List of all articles',
    type: Article,
    isArray: true
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get an article by ID',
    description: 'Retrieves a specific article by its UUID, including related period and topic.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the article',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The article with its related period and topic',
    type: Article 
  })
  @ApiNotFoundResponse({ 
    description: 'Article with the specified ID was not found'
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update an article',
    description: 'Updates a specific article by its UUID with the provided data.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the article to update',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateArticleDto,
    description: 'Article data to update'
  })
  @ApiOkResponse({ 
    description: 'The article has been successfully updated',
    type: Article 
  })
  @ApiNotFoundResponse({ 
    description: 'Article with the specified ID was not found'
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete an article',
    description: 'Removes a specific article by its UUID from the system.'
  })
  @ApiParam({ 
    name: 'id',
    description: 'The UUID of the article to delete',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOkResponse({ 
    description: 'The article has been successfully deleted',
    type: Article 
  })
  @ApiNotFoundResponse({ 
    description: 'Article with the specified ID was not found'
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
