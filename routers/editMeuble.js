import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const editMeubleRouter = new Router();
let categories, entreprises, allMateriaux, meuble

editMeubleRouter.get("/editMeuble/:id", async (req, res) => {
  categories = await Categories.find();
  entreprises = await Entreprise.find();
  allMateriaux = await Materiaux.find();
  let meubles = await Meuble.find({ _id: req.params.id });
  meuble = meubles[0]
  console.log(meuble)
  res.render("editMeuble", { meuble, entreprises, categories, allMateriaux })
});

editMeubleRouter.post("/editMeuble/:id", urlencodedParser, async (req, res) => {
  const { name, categorie, materiaux, qte } = req.body

  if (!name) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Le nom ne peut être vide" });
  }

  if (!materiaux) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Le meuble doit contenir des materiaux" });
  }

  if (qte <= 0) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Il doit y avoir au moins 1 meuble" });
  }

  let mats = [], tags = [];
  materiaux.forEach(mat => {
    mats.push(JSON.parse(mat)["_id"]);
    tags.push(JSON.parse(mat)["name"]);
  })

  try {
    await Meuble.findOneAndUpdate({ _id: req.params.id }, {
      name: name,
      materiaux: mats,
      qte: qte,
      categorie: categorie,
      tags: tags
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Impossible d'insérer le document" });
  }
})

export default editMeubleRouter
