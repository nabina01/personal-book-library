import express from "express";
import { addBookAuthor } from "../controllers/books-authors.controller.js";

const router = express.Router();

router.post("/", addBookAuthor);

export default router;
