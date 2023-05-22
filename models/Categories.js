import { Schema, SchemaTypes, Types, model } from "mongoose"

const categorieSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "categorie"
export default model("Categorie", categorieSchema, collectionName)