<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for the Historical Site application.

## Article Management Workflows

### Article Creation Flow

When creating articles with content and images, follow this specific sequence of API calls:

### Step 1: Create the Base Article First

#### For a Person Article:
```
POST /articles/person
```
Body (JSON):
```json
{
  "personName": "Julius Caesar",
  "personAvatar": "...",
  "birthYear": 100,
  "deathYear": 44,
  "nationality": "Roman",
  "article": {
    "articleType": "PERSON",
    "articleName": "Julius Caesar"
  }
}
```

#### For an Event Article:
```
POST /articles/event
```
Body (JSON):
```json
{
  "periodId": "uuid-of-period",
  "topicId": "uuid-of-topic",
  "article": {
    "articleType": "EVENT",
    "articleName": "Battle of Waterloo"
  }
}
```

The response will include the newly created article with its `articleId`, which you'll need for the next steps.

### Step 2: Create Contents for the Article

For each content, call:
```
POST /articles/content
```

For a parent content (top-level content):
```json
{
  "contentName": "Introduction",
  "articleId": "article-id-from-step-1",
  "content": "Content text goes here...",
  "parentId": null
}
```

For child contents (after creating the parent):
```json
{
  "contentName": "Early Life",
  "articleId": "article-id-from-step-1",
  "parentId": "parent-content-id",
  "content": "Child content text goes here..."
}
```

The response will include the newly created content with its `contentId`, which you'll need for uploading images.

### Step 3: Upload Images for Each Content

For each image, call:
```
POST /articles/image
```

This must be sent as `multipart/form-data` with:
- `file`: The actual image file
- Other fields as form data:
  ```
  contentId: "content-id-from-step-2"
  alt: "Alt text for the image"
  caption: "Image caption"
  width: 800 (optional)
  height: 600 (optional)
  ```

The image will be uploaded to Supabase storage, and the URL will be automatically generated and stored in the database.

### Important Notes for Creation:

1. **Order matters**: Follow the exact sequence (Article → Content → Images)
2. **Parent-child relationships**: Create parent contents before their children
3. **File uploads**: Images must be sent as multipart/form-data, not JSON
4. **Required IDs**: 
   - Contents require an `articleId`
   - Images require a `contentId`
5. **Supabase storage**: Images are automatically stored in Supabase with paths organized by content ID

### Article Update Flow

When updating articles, you must use the specific endpoints for the article type (person or event):

#### For a Person Article:
```
PATCH /articles/person/:id
```
Body (JSON):
```json
{
  "personName": "Updated Name",
  "personAvatar": "https://example.com/updated-avatar.jpg",
  "birthYear": 101,
  "deathYear": 45,
  "nationality": "Updated Nationality",
  "article": {
    "article": {
      "articleName": "Updated Article Name",
      "articleContentList": {}
    }
  }
}
```

#### For an Event Article:
```
PATCH /articles/event/:id
```
Body (JSON):
```json
{
  "periodId": "updated-period-uuid",
  "topicId": "updated-topic-uuid",
  "article": {
    "article": {
      "articleName": "Updated Event Name",
      "articleContentList": {}
    }
  }
}
```

#### For Content Updates:
```
PATCH /articles/content/:id
```
Body (JSON):
```json
{
  "contentName": "Updated Content Name",
  "content": "Updated content text goes here..."
}
```

### Important Notes for Updates:

1. **Partial updates**: All fields are optional in update requests
2. **Type-specific updates**: Use the correct endpoint for the article type (person/event)
3. **Nested updates**: The article property is nested twice in person/event article updates
4. **No type changes**: You cannot change an article from one type to another (e.g., from PERSON to EVENT)

### Article Deletion Flow

To delete an article and all its associated data (contents and images):

```
DELETE /articles/:id
```

This will:
1. Delete all images from Supabase storage
2. Delete all image records from the database
3. Delete all content records for the article
4. Delete the person/event article record
5. Delete the base article record

### Important Notes for Deletion:

1. **Cascading deletion**: Deleting an article will delete all related content and images
2. **Storage cleanup**: Images will be removed from both the database and Supabase storage
3. **No recovery**: This operation cannot be undone, so use with caution

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
