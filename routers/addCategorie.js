import Categorie from "../models/Categories.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const categorieRouter = new Router();

// when entering /addCategorie, render the "addCategorie.pug" template
categorieRouter.get("/addCategorie", async (req, res) => {
  res.render("addCategorie")
});

// when submitting the form
categorieRouter.post("/addCategorie", urlencodedParser, async (req, res) => {
  const { name } = req.body

  // if the name is missing, display an error message
  if (!name) {
    return res.status(400).render("addCategorie", {error: "Le nom ne peut être vide"});
  }

  // create the categorie in the db and redirect the user to the home page, display if there's an error
  try {
    await Categorie.create({
      name: name
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err);
    res.status(500).render("addCategorie", {error: "Impossible d'insérer le document"});
  }
})

export default categorieRouter