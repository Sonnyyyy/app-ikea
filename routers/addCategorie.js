import Categorie from "../models/Categories.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const categorieRouter = new Router();

categorieRouter.get("/addCategorie", async (req, res) => {
  res.render("addCategorie")
});

categorieRouter.post("/addCategorie", urlencodedParser, async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).render("addCategorie", {error: "Le nom ne peut être vide"});
  }

  try {
    await Categorie.create({
      name: name,
    })
    res.redirect(304, "/");
  } catch (err) {
    console.log(err);
    res.status(500).render("addCategorie", {error: "Impossible d'insérer le document"});
  }
})

export default categorieRouter