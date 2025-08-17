import { prisma } from "../utils/prisma-clients.js";

// Get all books
export const getAllBooks = async (request, response) => {
  try {
    const books = await prisma.books.findMany({
      where: { id: Number(request.params.id) },
      include: {
        genre: true,
        authors: {
          include: { author: true }
        }
      }
    });
    response.json(books);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get one book
export const getBook = async (request, response) => {
  try {
    const book = await prisma.books.findUnique({
      where: { id: Number(request.params.id) },
      include: {
        genre: true,
        authors: { include: { author: true } }
      }
    });
    response.json(book);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create book
export const createBook = async (request, response) => {
  try {
    const book = await prisma.books.create({
      data: request.body
    });
    response.json(book);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Update book
export const updateBook = async (request, response) => {
  try {
    const book = await prisma.books.update({
      where: { id: Number(request.params.id) },
      data: request.body
    });
    response.json(book);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Delete book
export const deleteBook = async (request, response) => {
  try {
    await prisma.books.delete({ where: { id: Number(request.params.id) } });
    response.json({ message: "Book deleted" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
