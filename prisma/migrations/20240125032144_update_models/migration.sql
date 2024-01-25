/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `address` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstName`,
    ADD COLUMN `name` VARCHAR(64) NOT NULL;
