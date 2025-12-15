-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_userIdFK_fkey";

-- CreateTable
CREATE TABLE "images_book" (
    "id" TEXT NOT NULL,
    "picture_name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "images_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_userIdFK_fkey" FOREIGN KEY ("userIdFK") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_book" ADD CONSTRAINT "images_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
