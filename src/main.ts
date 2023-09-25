import bodyParser from "body-parser";
import express from "express";

import { config } from "./shared/infrastructure/config";

function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  app.get("/", (_, res) => {
    res.json({ ok: true, message: "Application loaded!" });
  });

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

bootstrap();
