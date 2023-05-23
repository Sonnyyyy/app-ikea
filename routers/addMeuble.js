import Categories from "../models/Categories.js"
import Entreprise from "../models/Entreprise.js"
import Materiaux from "../models/Materiaux.js"
import Meuble from "../models/Meuble.js"
import { Router } from "express"
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const meubleRouter = new Router();

meubleRouter.get("/addMeuble", async (req, res) => {
  const categories = await Categories.find()
  const entreprise = await Entreprise.find()
  const materiaux = await Materiaux.find()
  const meuble = await Meuble.find()
  res.render("addMeuble", { categories, entreprise, materiaux, meuble })
});

meubleRouter.post("/addMeuble", urlencodedParser, async (req, res) => {
  const { name, categorie, materiaux, tags, qte, tagsM } = req.body

  if (tagsM) {
      try{
        const categories = await Categories.find()
        const entreprise = await Entreprise.find()
        const meuble = await Meuble.find()
        const materiaux =  await Materiaux.find({ name : { $regex: tagsM } });
        res.render("addMeuble", { categories, entreprise, materiaux, meuble })
      } catch (err) {
        console.log(err)
        res.status(500).send("Impossible d'insérer le document")
      }
  }else{

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
    }
  })

  

export default meubleRouter
