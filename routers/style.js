import { Router } from "express"
import fs from 'fs'

const styleRouter = new Router();

// when accessing /style, read the style.css file located in assets
styleRouter.get("/style", async (req, res) => {
  res.statusCode = 200;
  const css = fs.readFileSync("assets/style.css");
  res.write(css);
  res.end();
  return;
});

export default styleRouter
