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
    "name" VARCHAR(50) NOT NULL,
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
    "last_visit" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" SERIAL NOT NULL,
    "type" "ProcedureType" NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "frequency" INTEGER NOT NULL,
    "category_id" INTEGER,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "age_left" INTEGER,
    "age_right" INTEGER,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" "ProcedureType" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "comment" VARCHAR(100),

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advices" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "advices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "contraindication" TEXT NOT NULL,
    "side_effects" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
