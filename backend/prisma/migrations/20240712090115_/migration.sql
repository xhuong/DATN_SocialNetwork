/*
  Warnings:

  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `participants` DROP FOREIGN KEY `Participants_user_id_fkey`;

-- AlterTable
ALTER TABLE `conversation` ADD COLUMN `first_user_id` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `second_user_id` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `participants`;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_first_user_id_fkey` FOREIGN KEY (`first_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_second_user_id_fkey` FOREIGN KEY (`second_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
