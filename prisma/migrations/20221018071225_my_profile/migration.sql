-- CreateTable
CREATE TABLE `MyProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skill` VARCHAR(255) NOT NULL,
    `about` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
