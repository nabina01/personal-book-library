import { prisma } from "../utils/prisma-clients.js";

// Get all genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genres.findMany({
      include: { books: true }
    });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one genre
export const getGenre = async (req, res) => {
  try {
    const genre = await prisma.genres.findUnique({
      where: { id: Number(req.params.id) },
      include: { books: true }
    });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create genre
export const createGenre = async (req, res) => {
  try {
    const genre = await prisma.genres.create({
      data: req.body
    });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update genre
export const updateGenre = async (req, res) => {
  try {
    const genre = await prisma.genres.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete genre
export const deleteGenre = async (req, res) => {
  try {
    await prisma.genres.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "Genre deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
