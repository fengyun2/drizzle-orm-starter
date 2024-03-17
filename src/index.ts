import express from "express";
import type { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import usersRouter from './routes/users'

const app: Express = express();
const port = process.env.PORT || 3000;

// 设置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置路由
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/users", usersRouter)

// 捕获 404 错误
app.use((req: Request, res: Response, next) => {
  const error = new Error("Not Found");
  // @ts-ignore
  error.status = 404;
  next(error);
  res.send("Not Found");
});

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
