-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(64) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `picture` ENUM('JESSICA', 'MAX', 'FELIX', 'BARSIK') NOT NULL DEFAULT 'JESSICA',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
