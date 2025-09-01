import prisma from '../utils/prisma-clients.js';

// GET all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      include: {
        genre: true,
        BooksAuthors: true,
        UserRead: true
      }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single book by ID
export const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.books.findUnique({
      where: { id: bookId },
      include: {
        genre: true,
        BooksAuthors: true,
        UserRead: true
      }
    });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new book
export const createBook = async (req, res) => {
  try {
    const { title, pages, published_date, blurb, cover_image, genreId, authorId } = req.body;

    const book = await prisma.books.create({
      data: {
        title,
        pages: parseInt(pages),                // String -> Int
        published_date: new Date(published_date), // String -> Date
        blurb,
        cover_image: cover_image || null,      // fallback if empty
        genreId: parseInt(genreId),            // String -> Int
        authorId: parseInt(authorId)           // String -> Int
      }
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a book
export const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, pages, published_date, blurb, cover_image, genreId,authorId } = req.body;
  try {
    const updatedBook = await prisma.books.update({
      where: { id: bookId },
      data: {
        title,
        pages,
        published_date: published_date ? new Date(published_date) : undefined,
        blurb,
        cover_image,
        genreId,
        authorId
      }
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a book
export const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    await prisma.books.delete({ where: { id: bookId } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
