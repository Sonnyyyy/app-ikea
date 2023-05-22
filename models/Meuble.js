import { Schema, SchemaTypes, Types, model } from "mongoose"

const meubleSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    materiaux: {type: Array, required: true},
    qte : {type: Number, required:true},
    categorie : {type: SchemaTypes.ObjectId, required:true},
    tags: {type: Array, required: true}
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "meuble"
export default model("Meuble", meubleSchema, collectionName)