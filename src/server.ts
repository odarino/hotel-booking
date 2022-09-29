import { sequelizeInstance } from "config/database-context";
import cors from "cors";
import express from "express";

import MainRouter from "./components";

const app = express();

sequelizeInstance.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

app.use("/api", MainRouter);

app.set("port", port);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
