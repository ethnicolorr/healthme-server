-- AlterTable
ALTER TABLE `Appointment` MODIFY `comment` VARCHAR(256) NULL,
    MODIFY `address` VARCHAR(256) NULL;

-- AlterTable
ALTER TABLE `Note` MODIFY `comment` VARCHAR(128) NULL;
