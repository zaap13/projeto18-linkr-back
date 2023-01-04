import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
