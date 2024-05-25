-- CreateEnum
CREATE TYPE "UserPicture" AS ENUM ('JESSICA', 'MAX', 'FELIX', 'BARSIK');

-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('LIGHT', 'MEDIUM', 'HARD', 'MEDICINE', 'TEMPERATURE');

-- CreateEnum
CREATE TYPE "MedProcedureType" AS ENUM ('APPOINTMENT', 'EXAMINATION', 'VACCINATION');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "birthDate" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "picture" "UserPicture" NOT NULL DEFAULT 'JESSICA',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "comment" VARCHAR(128),
    "type" "NoteType" NOT NULL,
    "temperature" DOUBLE PRECISION,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedProcedure" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "type" "MedProcedureType" NOT NULL,
    "lastVisit" DATE NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "MedProcedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedProcedureTemplate" (
    "id" SERIAL NOT NULL,
    "type" "MedProcedureType" NOT NULL,
    "frequency" INTEGER NOT NULL,
    "unit" "Unit" NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "MedProcedureTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "ageLeft" INTEGER NOT NULL,
    "ageRight" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "type" "MedProcedureType" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "comment" VARCHAR(128),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(128) NOT NULL,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MedProcedure_name_key" ON "MedProcedure"("name");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedProcedure" ADD CONSTRAINT "MedProcedure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedProcedureTemplate" ADD CONSTRAINT "MedProcedureTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
