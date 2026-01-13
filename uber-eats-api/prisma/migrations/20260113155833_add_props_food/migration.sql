/*
  Warnings:

  - Added the required column `category` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodType` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readyTime` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "foodType" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "readyTime" INTEGER NOT NULL;
