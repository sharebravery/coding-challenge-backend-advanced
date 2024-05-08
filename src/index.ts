import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import initMiddleware from "./middleware";
import initRoute from "./routes";

dotenv.config()

const app: Express = express();

const port = process.env.PORT || "7777";

initMiddleware(app)

const routes = initRoute()

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api", routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}


export default app