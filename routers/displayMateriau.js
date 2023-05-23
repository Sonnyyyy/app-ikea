import Materiaux from "../models/Materiaux.js"
import { Router } from "express"

const displayMatRouter = new Router();
let materiau

displayMatRouter.get("/displayMateriau/:id", async (req, res) => {
  const materiaux = await Materiaux.find({ _id: req.params.id });
  materiau = materiaux[0];
  res.render("displayMateriau", { materiau })
});

export default displayMatRouter
