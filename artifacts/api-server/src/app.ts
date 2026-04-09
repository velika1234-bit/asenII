import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontendDistCandidates = [
  path.resolve(process.cwd(), "../ivan-asen-ii/dist/public"),
  path.resolve(process.cwd(), "artifacts/ivan-asen-ii/dist/public"),
];

const frontendDist = frontendDistCandidates.find((candidate) =>
  fs.existsSync(path.join(candidate, "index.html")),
);

if (frontendDist) {
  app.use(express.static(frontendDist));

  app.get("/", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.json({
      name: "asenII api-server",
      status: "ok",
      healthcheck: "/api/healthz",
    });
  });
}

app.get("/healthz", (_req, res) => {
  res.redirect(307, "/api/healthz");
});


app.use("/api", router);

if (frontendDist) {
  app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

export default app;
