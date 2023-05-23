import Entreprise from "../models/Entreprise.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const entrepriseRouter = new Router();

entrepriseRouter.get("/addEntreprise", async (req, res) => {
  res.render("addEntreprise")
});

entrepriseRouter.post("/addEntreprise", urlencodedParser, async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).render("addEntreprise", {error: "Le nom ne peut être vide"});
  }

  try {
    await Entreprise.create({
      name: name,
    })
    res.redirect(304, "/");
  } catch (err) {
    console.log(err)
    res.status(500).render("addEntreprise", {error: "Impossible d'insérer le document"});
  }
})

export default entrepriseRouter
