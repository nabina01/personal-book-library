import express from "express";
import {createAuthor,  getAuthors, getAuthorById,updateAuthor,deleteAuthor,} from "../controllers/author.controller.js";

const router = express.Router();

router.post("/", createAuthor);      // Create
router.get("/", getAuthors);         // Read all
router.get("/id", getAuthorById);  // Read one
router.patch("/id", updateAuthor); // Update
router.delete("/id", deleteAuthor);// Delete

export default router;
