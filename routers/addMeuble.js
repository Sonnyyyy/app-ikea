import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const meubleRouter = new Router();
let categories, entreprises, allMateriaux

meubleRouter.get("/addMeuble", async (req, res) => {
  categories = await Categories.find();
  entreprises = await Entreprise.find();
  allMateriaux = await Materiaux.find();
  res.render("addMeuble", { categories, entreprises, allMateriaux })
});

meubleRouter.post("/addMeuble", urlencodedParser, async (req, res) => {
  const { name, categorie, materiaux, tags, qte = 1 } = req.body

  if (!name) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Le nom ne peut être vide" });
  }

  if (!materiaux) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Le meuble doit contenir des materiaux" });
  }

  if (qte <= 0) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Il doit y avoir au moins 1 meuble" });
  }

  try {
    await Meuble.create({
      name: name,
      materiaux: materiaux,
      qte: qte,
      categorie: categorie,
      tags: tags
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMeuble", { categories, entreprises, allMateriaux, error: "Impossible d'insérer le document" });
  }
})

export default meubleRouter
