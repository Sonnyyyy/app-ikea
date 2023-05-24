import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const editMeubleRouter = new Router();
let categories, entreprises, allMateriaux, meuble

// when entering /editMeuble, get the categories, entreprises, materiaux and the meuble with the conrresponding id from the db, then render the "editMeuble.pug" template
editMeubleRouter.get("/editMeuble/:id", async (req, res) => {
  categories = await Categories.find();
  entreprises = await Entreprise.find();
  allMateriaux = await Materiaux.find();
  let meubles = await Meuble.find({ _id: req.params.id });
  meuble = meubles[0]
  res.render("editMeuble", { meuble, entreprises, categories, allMateriaux })
});

// when submitting the form
editMeubleRouter.post("/editMeuble/:id", urlencodedParser, async (req, res) => {
  const { name, categorie, materiaux, qte } = req.body

  // if the name is missing, display an error message
  if (!name) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Le nom ne peut être vide" });
  }

  // if the materiaux are missing, display an error message
  if (!materiaux) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Le meuble doit contenir des materiaux" });
  }

  // if quantity is less than 1, display an error message
  if (qte <= 0) {
    return res.status(400).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Il doit y avoir au moins 1 meuble" });
  }

  // make materiaux into an array if it isn't one
  let mats = []
  if(Array.isArray(materiaux)){
    materiaux.forEach(mat => {
      mats.push(JSON.parse(mat));
    })
  }else{
    mats.push(JSON.parse(materiaux));
  }

  // update the meuble in the db and redirect the user to the home page, display if there's an error
  try {
    await Meuble.findOneAndUpdate({ _id: req.params.id }, {
      name: name,
      materiaux: mats,
      qte: qte,
      categorie: categorie
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMeuble", { meuble, entreprises, categories, allMateriaux, error: "Impossible d'insérer le document" });
  }
})

export default editMeubleRouter
