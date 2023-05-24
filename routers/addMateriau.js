import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const materiauRouter = new Router();
let entreprises

// when entering /addMateriau, get the entreprises from the db, then render the "addMateriau.pug" template
materiauRouter.get("/addMateriau", async (req, res) => {
  entreprises = await Entreprise.find()
  res.render("addMateriau", { entreprises })
});

// when submitting the form
materiauRouter.post("/addMateriau", urlencodedParser, async (req, res) => {
  const { name, description, entreprise } = req.body

  // if the name is missing, display an error message
  if (!name) {
    return res.status(400).render("addMateriau", { entreprises, error: "Le nom ne peut être vide" });
  }

  // if the description is missing, display an error message
  if (!description) {
    return res.status(400).render("addMateriau", { entreprises, error: "Le nom ne peut être vide" });
  }

  // if the entreprise is missing, display an error message
  if (!entreprise) {
    return res.status(400).render("addMateriau", { entreprises, error: "Le materiau doit appartenir à une entreprise" });
  }

  // create the materiau in the db and redirect the user to the home page, display if there's an error
  try {
    await Materiaux.create({
      name: name,
      description: description,
      entreprise: entreprise
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMateriau", { entreprises, error: "Impossible d'insérer le document" });
  }
})

export default materiauRouter
