import { prisma } from "../utils/prisma-clients.js";

// Link book and author
export const addBookAuthor = async (request, response) => {
  try {
    const relation = await prisma.bookAuthor.create({
      data: {
        bookId: req.body.bookId,
        authorId: request.body.authorId
      }
    });
    response.json(relation);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
