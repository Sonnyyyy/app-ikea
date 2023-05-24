import homeRouter from "./routers/home.js"
import categorieRouter from "./routers/addCategorie.js"
import entrepriseRouter from "./routers/addEntreprise.js"
import materiauRouter from "./routers/addMateriau.js"
import meubleRouter from "./routers/addMeuble.js"
import editMeubleRouter from "./routers/editMeuble.js"
import styleRouter from "./routers/style.js"
import displayMatRouter from "./routers/displayMateriau.js"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
dotenv.config()

const { APP_HOST, APP_PORT, MONGO_URI, NODE_ENV } = process.env

const app = express()

// Déclarer le moteur de rendu à Express
app.set("view engine", "pug")

// Déclarer tout les routers
app.use(homeRouter)
app.use(categorieRouter)
app.use(entrepriseRouter)
app.use(materiauRouter)
app.use(displayMatRouter)
app.use(meubleRouter)
app.use(editMeubleRouter)
app.use(styleRouter)

// Minifier automatiquement les templates PUG en production, mais pas en dev
app.locals.pretty = NODE_ENV !== "production" ? true : false

// Déclaration des routeurs et middlewares
app.use(express.urlencoded({ extended: false })) // Fourni l'objet "req.body" lors de la validation de formulaire

try {
  await mongoose.connect(MONGO_URI)
  console.log("Connexion MonboDB établie!")

  app.listen(APP_PORT, () =>
    console.log(`L'application écoute sur http://${APP_HOST}:${APP_PORT}`)
  )
} catch (err) {
  console.log("Impossible de démarrer l'application Node", err.message)
}
