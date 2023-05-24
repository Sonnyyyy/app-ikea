import Meuble from "../models/Meuble.js";
import Categories from "../models/Categories.js"
import { Router } from "express";

const deleteRouter = new Router();

// when entering /deleteMeuble, get the meuble with the conrresponding id from the db, then delete it
deleteRouter.get("/deleteMeuble/:id", async (req, res) => {

    try {
        await Meuble.findOneAndDelete({ _id: req.params.id });
        res.redirect(301, "/");
    } catch (error) {
        let categories = await Categories.find();
        let meuble = await Meuble.find();
        return res.status(400).render("home", { categories, meuble });
    }
});

export default deleteRouter
