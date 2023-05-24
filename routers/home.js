import Categories from "../models/Categories.js";
import Meuble from "../models/Meuble.js";
import { Router } from "express";
import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const homeRouter = new Router();

homeRouter.get("/", async (req, res) => {
  const categories = await Categories.find()
  const meuble = await Meuble.find()
  res.render("home", { categories, meuble })
});

homeRouter.post('/',urlencodedParser,async(req,res)=>{
    const {tags,categorie}  = req.body;
  
    try{
      const categories = await Categories.find()
      let meuble;

      if(!tags && !categorie){
        meuble = await Meuble.find()
      }else if(!tags){
        meuble = await Meuble.find({categorie : categorie});
      }else if(!categorie){
        meuble = await Meuble.find({"tags" : {$regex : tags}});
      }else{
        meuble = await Meuble.find({$and :[{"tags" : {$regex : tags}},{categorie : categorie}] });
      }

      res.render("home", { categories, meuble })
    } catch (err) {
      console.log(err)
      res.status(500).send("Recherche impossible !")
    }

})

export default homeRouter
