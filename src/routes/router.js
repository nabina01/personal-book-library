//It is a router file generally used to manage al the routes and routes files

import { Router } from "express";

const router = Router();
// Import all route files
import userRoutes from "./user.route.js";
import booksRoutes from "./books.routes.js";
import authorRoutes from './author.routes.js';
import genresRoutes from "./genres.route.js";

router.use("/users", userRoutes);
router.use("/books", booksRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genresRoutes);

export default router;
