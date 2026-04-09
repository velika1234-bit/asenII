import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    name: "asenII api-server",
    status: "ok",
    healthcheck: "/api/healthz",
  });
});

app.get("/healthz", (_req, res) => {
  res.redirect(307, "/api/healthz");
});

app.use("/api", router);

export default app;
