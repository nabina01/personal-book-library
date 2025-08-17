import { prisma } from "../utils/prisma-clients.js";

// Get all authors
export const getAllAuthors = async (request, response) => {
  try {
    const authors = await prisma.author.findMany({
       where: { id: Number(request.params.id) },
      include: { books: { include: { book: true } } }
    });
    response.json(authors);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create author
export const createAuthor = async (request, response) => {
  try {
    const author = await prisma.author.create({ data: request.body });
    response.json(author);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
