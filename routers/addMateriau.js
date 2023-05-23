import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const materiauRouter = new Router();

materiauRouter.get("/addMateriau", async (req, res) => {
  const entreprise = await Entreprise.find()
  res.render("addMateriau", { entreprise })
});

materiauRouter.post("/addMateriau", urlencodedParser, async (req, res) => {
  const { name, entreprise, tags } = req.body

  if (!name) {
    return res.status(400).render("addMateriau", {error: "Le nom ne peut être vide"});
  }

  if (!entreprise) {
    return res.status(400).render("addMateriau", {error: "Le materiau doit appartenir à une entreprise"});
  }

  try {
    await Materiaux.create({
      name: name,
      entreprise: entreprise,
      tags: tags,
    })
    res.redirect(304, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMateriau", {error: "Impossible d'insérer le document"});
  }
})

export default materiauRouter
