import  prisma  from "../utils/prisma-clients.js";

// Create author
export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;

    if (!bio) {
      return res.status(400).json({ message: "Bio is required" });
    }

    const author = await prisma.authors.create({
      data: { name, bio },
    });

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all authors
export const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.authors.findMany({
      include: { BooksAuthors: true }, // include relations if needed
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one author
export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await prisma.authors.findUnique({
      where: { id: Number(id) },
      include: { BooksAuthors: true },
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update author
export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;

    const updated = await prisma.authors.update({
      where: { id: Number(id) },
      data: { name, bio },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete author
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.authors.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
