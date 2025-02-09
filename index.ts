import express from "express";
import healthRouter from "./routes/healthRoutes";
import echoRouter from "./routes/echoRoute";
import timeRouter from "./routes/timeRoute";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/health", healthRouter);
app.use("/echo", echoRouter);
app.use("/time", timeRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
