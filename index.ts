import express from "express";
import healthRouter from "./src/routes/healthRoutes";
import echoRouter from "./src/routes/echoRoute";
import timeRouter from "./src/routes/timeRoute";
import { configDotenv } from "dotenv";
import cacheRouter from "./src/routes/cacheRoute";
import { errorHandler } from "./src/middlewares/errorHandling";
configDotenv();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/health", healthRouter);
app.use("/echo", echoRouter);
app.use("/time", timeRouter);
app.use('/',cacheRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
