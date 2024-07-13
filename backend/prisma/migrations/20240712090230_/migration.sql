-- AlterTable
ALTER TABLE `conversation` MODIFY `first_user_id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `second_user_id` INTEGER NOT NULL DEFAULT 1;
