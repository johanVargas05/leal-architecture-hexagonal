import "module-alias/register";

import routes from "@infrastructure/routes";
import { config } from "@infrastructure/shared/config";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(bodyParser.json());

  app.use(routes);
  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

bootstrap();
