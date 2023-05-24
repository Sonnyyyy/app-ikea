import Entreprise from "../models/Entreprise.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const entrepriseRouter = new Router();

// when entering /addEntreprise, render the "addEntreprise.pug" template
entrepriseRouter.get("/addEntreprise", async (req, res) => {
  res.render("addEntreprise")
});

// when submitting the form
entrepriseRouter.post("/addEntreprise", urlencodedParser, async (req, res) => {
  const { name } = req.body

  // if the name is missing, display an error message
  if (!name) {
    return res.status(400).render("addEntreprise", {error: "Le nom ne peut être vide"});
  }

  // create the entreprise in the db and redirect the user to the home page, display if there's an error
  try {
    await Entreprise.create({
      name: name
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addEntreprise", {error: "Impossible d'insérer le document"});
  }
})

export default entrepriseRouter
