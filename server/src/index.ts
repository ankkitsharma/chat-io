import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT;
import Routes from "./routes/index.js";

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("It's working 🙌");
});

// Routes
app.use("/api", Routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
