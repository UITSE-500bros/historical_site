import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
declare const module: any;
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
    .addTag('Topics', 'Operations related to historical topics')
    .addTag('Periods', 'Operations related to historical periods')
    .addTag('Articles', 'Operations related to historical articles')
    .addTag('Feedbacks', 'Operations related to user feedback')
    .addTag('Payments', 'Operations related to ticket payments')
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
    .build();

  const document = SwaggerModule.createDocument(app, config);
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
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
