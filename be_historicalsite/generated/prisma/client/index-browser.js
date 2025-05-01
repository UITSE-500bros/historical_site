
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PeriodScalarFieldEnum = {
  periodId: 'periodId',
  periodName: 'periodName',
  periodImage: 'periodImage',
  startYear: 'startYear',
  endYear: 'endYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TopicScalarFieldEnum = {
  topicId: 'topicId',
  topicName: 'topicName',
  topicImage: 'topicImage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ArticleScalarFieldEnum = {
  articleId: 'articleId',
  articleType: 'articleType',
  articleName: 'articleName',
  articleContentList: 'articleContentList',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PersonArticleScalarFieldEnum = {
  articleId: 'articleId',
  personName: 'personName',
  personAvatar: 'personAvatar',
  birthYear: 'birthYear',
  deathYear: 'deathYear',
  nationality: 'nationality',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EventArticleScalarFieldEnum = {
  articleId: 'articleId',
  periodId: 'periodId',
  topicId: 'topicId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContentScalarFieldEnum = {
  contentId: 'contentId',
  contentName: 'contentName',
  articleId: 'articleId',
  parentId: 'parentId',
  content: 'content',
  imagesId: 'imagesId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ImageScalarFieldEnum = {
  imageId: 'imageId',
  contentId: 'contentId',
  src: 'src',
  alt: 'alt',
  caption: 'caption',
  width: 'width',
  height: 'height',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdminScalarFieldEnum = {
  adminId: 'adminId',
  adminFisrtName: 'adminFisrtName',
  adminLastName: 'adminLastName',
  adminPassword: 'adminPassword',
  adminEmail: 'adminEmail',
  adminAvatar: 'adminAvatar',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  phoneNumber: 'phoneNumber'
};

exports.Prisma.FeedbackScalarFieldEnum = {
  feedbackId: 'feedbackId',
  subject: 'subject',
  message: 'message',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  paymentId: 'paymentId',
  userEmail: 'userEmail',
  quantity: 'quantity',
  paymentType: 'paymentType',
  status: 'status',
  bookingDate: 'bookingDate',
  totalPrice: 'totalPrice',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ArticleType = exports.$Enums.ArticleType = {
  EVENT: 'EVENT',
  PERSON: 'PERSON'
};

exports.FeedbackSubject = exports.$Enums.FeedbackSubject = {
  BUG: 'BUG',
  FEATURE: 'FEATURE',
  GENERAL: 'GENERAL'
};

exports.FeedbackStatus = exports.$Enums.FeedbackStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED'
};

exports.PaymentType = exports.$Enums.PaymentType = {
  DEBIT_CARD: 'DEBIT_CARD',
  DIGITAL_WALLET: 'DIGITAL_WALLET',
  GOOGLE_PAY: 'GOOGLE_PAY'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  Period: 'Period',
  Topic: 'Topic',
  Article: 'Article',
  PersonArticle: 'PersonArticle',
  EventArticle: 'EventArticle',
  Content: 'Content',
  Image: 'Image',
  Admin: 'Admin',
  Feedback: 'Feedback',
  Payment: 'Payment'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
