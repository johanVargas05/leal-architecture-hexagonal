import "module-alias/register";

import routes from "@infrastructure/routes";
import { config } from "@infrastructure/shared/config";
import bodyParser from "body-parser";
import express from "express";

function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  app.get("/", (_, res) => {
    res.json({ ok: true, message: "Application loaded!" });
  });

  app.use("/api", routes);
  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

bootstrap();
