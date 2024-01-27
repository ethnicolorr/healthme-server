/*
  Warnings:

  - You are about to drop the column `address` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `VarChar(32)`.
  - You are about to alter the column `comment` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(128)`.
  - You are about to drop the column `dateTime` on the `Note` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Procedure` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `VarChar(32)`.
  - You are about to alter the column `gender` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1)` to `Enum(EnumId(5))`.
  - Added the required column `startedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `address`,
    DROP COLUMN `dateTime`,
    ADD COLUMN `startedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(32) NOT NULL,
    MODIFY `comment` VARCHAR(128) NULL;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `dateTime`,
    ADD COLUMN `startedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Procedure` MODIFY `lastVisit` DATE NOT NULL,
    MODIFY `name` VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `gender` ENUM('M', 'F') NOT NULL;

-- CreateTable
CREATE TABLE `ProcedureTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('APPOINTMENT', 'EXAMINATION', 'VACCINATION') NOT NULL,
    `frequency` INTEGER NOT NULL,
    `categoryId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ageLeft` INTEGER NOT NULL,
    `ageRight` INTEGER NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProcedureTemplate` ADD CONSTRAINT `ProcedureTemplate_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
