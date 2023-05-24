import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const meubleRouter = new Router();
let categories, entreprises, allMateriaux

// when entering /addMeuble, get the categories, entreprises and materiaux from the db, then render the "addMeuble.pug" template
meubleRouter.get("/addMeuble", async (req, res) => {
  categories = await Categories.find();
  entreprises = await Entreprise.find();
  allMateriaux = await Materiaux.find();
  res.render("addMeuble", { categories, entreprises, allMateriaux })
});

// when submitting the form
meubleRouter.post("/addMeuble", urlencodedParser, async (req, res) => {
  const { name, categorie, materiaux, qte } = req.body

  // if the name is missing, display an error message
  if (!name) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Le nom ne peut être vide" });
  }

  // if the materiaux are missing, display an error message
  if (!materiaux) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Le meuble doit contenir des materiaux" });
  }

  // if quantity is less than 1, display an error message
  if (qte <= 0) {
    return res.status(400).render("addMeuble", { categories, entreprises, allMateriaux, error: "Il doit y avoir au moins 1 meuble" });
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

  // create the meuble in the db and redirect the user to the home page, display if there's an error
  try {
    await Meuble.create({
      name: name,
      materiaux: mats,
      qte: qte,
      categorie: categorie
    })
    res.redirect(301, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addMeuble", { categories, entreprises, allMateriaux, error: "Impossible d'insérer le document" });
  }
})

export default meubleRouter
