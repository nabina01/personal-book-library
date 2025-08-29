import { prisma } from "../utils/prisma-clients.js";

// Create UserRead
export const createUserRead = async (req, res) => {
  try {
    const { userId, bookId, status, review, favorite, summary, currentPage, readingGoal, rating } = req.body;

    const userRead = await prisma.userRead.create({
      data: {
        userId,
        bookId,
        status,
        review,
        favorite,
        summary,
        currentPage,
        readingGoal,
        rating
      },
    });

    res.status(201).json(userRead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All UserReads
export const getAllUserRead = async (req, res) => {
  try {
    const userReads = await prisma.userRead.findMany();
    res.status(200).json(userReads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One UserRead by ID
export const getOneUserRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userRead = await prisma.userRead.findUnique({
      where: { id: Number(id) },
    });

    if (!userRead) return res.status(404).json({ message: "Record not found" });

    res.status(200).json(userRead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update UserRead
export const updateUserRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, bookId, status, review, favorite, summary, currentPage, readingGoal, rating } = req.body;

    const updatedUserRead = await prisma.userRead.update({
      where: { id: Number(id) },
      data: { userId, bookId, status, review, favorite, summary, currentPage, readingGoal, rating },
    });

    res.status(200).json(updatedUserRead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete UserRead
export const deleteUserRead = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.userRead.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

