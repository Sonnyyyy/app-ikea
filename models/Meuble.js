import { Schema, SchemaTypes, Types, model } from "mongoose"

const meubleSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    materiaux: {type: Array, required: true}, // array of materiaux objects the meuble is composed of
    qte : {type: Number, required:true}, // quantity of this meuble
    categorie : {type: SchemaTypes.ObjectId, required:true}, // id of the categorie this meuble belongs to
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "meuble"
export default model("Meuble", meubleSchema, collectionName)