import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"

const appRouter = new Router();

appRouter.get("/", async (req, res) => {
  const categories = await Categories.find()
  const entreprise = await Entreprise.find()
  const materiaux = await Materiaux.find()
  const meuble = await Meuble.find()
  res.render("home", { categories, entreprise, materiaux, meuble })
});

appRouter.get("/add", async (req, res) => {
  const categories = await Categories.find()
  const entreprise = await Entreprise.find()
  const materiaux = await Materiaux.find()
  const meuble = await Meuble.find()
  res.render("add", { categories, entreprise, materiaux, meuble })
});

appRouter.post("/add", async (req, res) => {
  const { name, categorie, materiaux, tags, qte } = req.body

  if (!name) {
    return res.status(400).send("Le nom ne peut être vide")
  }

  if (!materiaux) {
    return res.status(400).send("Le meuble doit contenir des materiaux")
  }

  if (qte <= 0) {
    return res.status(400).send("Il doit y avoir au moins 1 meuble")
  }

  try {
    await Meuble.create({
      name: name,
      materiaux: materiaux,
      qte: qte,
      categorie: categorie,
      tags: tags
    })
    res.status(201).send("Meuble créé")
  } catch (err) {
    console.log(err)
    res.status(500).send("Impossible d'insérer le document")
  }
})

export default appRouter
