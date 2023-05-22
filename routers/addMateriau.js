import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import { Router } from "express"

const materiauRouter = new Router();

materiauRouter.get("/addMateriau", async (req, res) => {
  const entreprise = await Entreprise.find()
  res.render("addMateriau", { entreprise })
});

materiauRouter.post("/addMateriau", async (req, res) => {
  const { name, entreprise, tags } = req.body

  if (!name) {
    return res.status(400).send("Le nom ne peut être vide")
  }

  if (!entreprise) {
    return res.status(400).send("Le materiau doit appartenir à une entreprise")
  }

  try {
    await Materiaux.create({
      name: name,
      entreprise: entreprise,
      tags: tags,
    })
    res.status(201).send("Materiau créé")
  } catch (err) {
    console.log(err)
    res.status(500).send("Impossible d'insérer le document")
  }
})

export default materiauRouter
