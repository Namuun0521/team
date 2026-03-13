/*
  Warnings:

  - Added the required column `category` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Дизайн', 'ХӨГЖҮҮЛЭГЧ', 'Хэл_сурах', 'Маркетинг', 'Фитнес', 'Ерөнхий_эрдэм', 'Бусад');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "FreelancerProfile" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE INDEX "Course_category_idx" ON "Course"("category");
