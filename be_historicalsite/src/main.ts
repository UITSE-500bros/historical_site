import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Article } from './modules/articles/entities/article.entity';
import { Content } from './modules/articles/entities/content.entity';
import { PersonArticle } from './modules/articles/entities/personArticle.entity';
import { EventArticle } from './modules/articles/entities/eventArticle.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Add cache control headers to prevent caching issues
  app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('History site SE109.P21')
    .setDescription('API for Historical Site - A comprehensive platform for exploring historical periods, topics, and articles')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('periods', 'Endpoints for managing historical periods')
    .addTag('topics', 'Endpoints for managing historical topics')
    .addTag('articles', 'Endpoints for managing historical articles')
    .addTag('payments', 'Endpoints for managing payments')
    .addTag('feedbacks', 'Endpoints for managing feedbacks')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
    extraModels: [Article, Content, PersonArticle, EventArticle],
  });
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      deepLinking: true,
    },
    customSiteTitle: 'Historical Site API Documentation',
  });

  await app.listen(process.env.PORT ?? 8888);
}
bootstrap();
