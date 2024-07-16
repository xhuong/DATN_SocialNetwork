-- AlterTable
ALTER TABLE `images` ADD COLUMN `user_id` INTEGER NOT NULL DEFAULT -1;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
