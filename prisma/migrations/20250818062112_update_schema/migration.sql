-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "blurb" TEXT,
    "cover_image" TEXT,
    "genreId" INTEGER,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BooksAuthors" (
    "id" SERIAL NOT NULL,
    "booksId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "BooksAuthors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Books" ADD CONSTRAINT "Books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "public"."Genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BooksAuthors" ADD CONSTRAINT "BooksAuthors_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "public"."Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BooksAuthors" ADD CONSTRAINT "BooksAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
