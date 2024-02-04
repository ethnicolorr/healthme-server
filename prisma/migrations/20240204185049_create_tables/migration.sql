-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `birthDate` DATE NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `picture` ENUM('JESSICA', 'MAX', 'FELIX', 'BARSIK') NOT NULL DEFAULT 'JESSICA',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(32) NOT NULL DEFAULT 'Температура',
    `comment` VARCHAR(128) NULL,
    `type` ENUM('LIGHT', 'MEDIUM', 'HARD', 'MEDICINE', 'TEMPERATURE') NOT NULL,
    `temperature` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedProcedure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `frequency` INTEGER NOT NULL,
    `type` ENUM('APPOINTMENT', 'EXAMINATION', 'VACCINATION') NOT NULL,
    `lastVisit` DATE NOT NULL,
    `name` VARCHAR(32) NOT NULL,

    UNIQUE INDEX `MedProcedure_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedProcedureTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('APPOINTMENT', 'EXAMINATION', 'VACCINATION') NOT NULL,
    `frequency` INTEGER NOT NULL,
    `unit` ENUM('DAY', 'WEEK', 'MONTH', 'YEAR') NOT NULL,
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

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `type` ENUM('APPOINTMENT', 'EXAMINATION', 'VACCINATION') NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `comment` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Advice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedProcedure` ADD CONSTRAINT `MedProcedure_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedProcedureTemplate` ADD CONSTRAINT `MedProcedureTemplate_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
