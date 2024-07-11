/*
  Warnings:

  - You are about to drop the column `packageId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_packageId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "packageId";

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "imageId";
