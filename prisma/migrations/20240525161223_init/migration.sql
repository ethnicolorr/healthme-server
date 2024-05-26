-- CreateEnum
CREATE TYPE "UserPicture" AS ENUM ('JESSICA', 'MAX', 'FELIX', 'BARSIK');

-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('LIGHT', 'MEDIUM', 'HARD', 'MEDICINE', 'TEMPERATURE');

-- CreateEnum
CREATE TYPE "ProcedureType" AS ENUM ('APPOINTMENT', 'EXAMINATION', 'VACCINATION');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "picture" "UserPicture" NOT NULL DEFAULT 'JESSICA',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "comment" VARCHAR(100),
    "type" "NoteType" NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "type" "ProcedureType" NOT NULL,
    "last_visit" DATE NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" SERIAL NOT NULL,
    "type" "ProcedureType" NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "frequency" INTEGER NOT NULL,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "age_left" INTEGER NOT NULL,
    "age_right" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recs_by_categories" (
    "recommendation_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "recs_by_categories_pkey" PRIMARY KEY ("recommendation_id","category_id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "type" "ProcedureType" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "comment" VARCHAR(100),

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recs_by_categories" ADD CONSTRAINT "recs_by_categories_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recs_by_categories" ADD CONSTRAINT "recs_by_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
