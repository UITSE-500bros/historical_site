-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Person', 'Event');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending_Payment', 'Paid', 'Cancelled');

-- CreateEnum
CREATE TYPE "FeedbackSubject" AS ENUM ('Ticket_Issue', 'Event_Complaint', 'Website_Suggestion', 'Other');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('Pending', 'In_Progress', 'Resolved');

-- CreateTable
CREATE TABLE "Periods" (
    "period_id" TEXT NOT NULL,
    "period_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_year" BIGINT NOT NULL,
    "end_year" BIGINT NOT NULL,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("period_id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "topic_id" TEXT NOT NULL,
    "topic_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "article_id" TEXT NOT NULL,
    "article_name" TEXT NOT NULL,
    "article_content" TEXT NOT NULL,
    "article_type" TEXT NOT NULL DEFAULT 'Event',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "images_list" JSONB,
    "period_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "payment_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending Payment',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "phone_number" TEXT NOT NULL,
    "total_price" BIGINT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Feedbacks" (
    "feedback_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Other',
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("feedback_id")
);

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Periods"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topics"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;
