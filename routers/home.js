import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"

const homeRouter = new Router();

homeRouter.get("/", async (req, res) => {
  const categories = await Categories.find()
  const entreprise = await Entreprise.find()
  const materiaux = await Materiaux.find()
  const meuble = await Meuble.find()
  res.render("home", { categories, entreprise, materiaux, meuble })
});

export default homeRouter
