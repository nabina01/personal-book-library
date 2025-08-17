import express from 'express';
import dotenv from 'dotenv';
import router  from './src/routes/router.js';
import booksRoutes from "./src/routes/books.routes.js";
import authorsRoutes from "./src/routes/author.routes.js";
import bookAuthorsRoutes from "./src/routes/books.authors.routes.js";
import genresRoutes from "./src/routes/genres.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.use("/api/users", router);
app.use("/api/books", booksRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/book-authors", bookAuthorsRoutes);
app.use("/api/genres", genresRoutes);



app.get('/', (request, response) => {
    response.send("Hello from express js server!");
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})

