import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js";
import hashRoutes from "./routes/hashtags.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(postsRoutes);
app.use(usersRoutes);
app.use(hashRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
