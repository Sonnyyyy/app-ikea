import Entreprise from "../models/Entreprise.js"
import { Router } from "express"

const entrepriseRouter = new Router();

entrepriseRouter.get("/addEntreprise", async (req, res) => {
  res.render("addEntreprise")
});

entrepriseRouter.post("/addEntreprise", async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).send("Le nom ne peut être vide")
  }

  try {
    await Entreprise.create({
      name: name,
    })
    res.status(201).send("Entreprise créé")
  } catch (err) {
    console.log(err)
    res.status(500).send("Impossible d'insérer le document")
  }
})

export default entrepriseRouter
