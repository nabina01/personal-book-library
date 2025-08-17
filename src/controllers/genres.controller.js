import { prisma } from "../utils/prisma-clients.js";

// Get all genres
export const getAllGenres = async (request, response) => {
  try {
    const genres = await prisma.genre.findMany({
      include: { books: true }
    });
    response.json(genres);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get one genre
export const getGenre = async (request, response) => {
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: Number(request.params.id) },
      include: { books: true }
    });
    response.json(genre);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create genre
export const createGenre = async (request, response) => {
  try {
    const genre = await prisma.genre.create({
      data: req.body
    });
    response.json(genre);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Update genre
export const updateGenre = async (request, response) => {
  try {
    const genre = await prisma.genre.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    response.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete genre
export const deleteGenre = async (request, response) => {
  try {
    await prisma.genre.delete({
      where: { id: Number(request.params.id) }
    });
    res.json({ message: "Genre deleted" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
