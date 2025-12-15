/*
  Warnings:

  - A unique constraint covering the columns `[ISBN]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISBN` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "books_title_key";

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "ISBN" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_ISBN_key" ON "books"("ISBN");
