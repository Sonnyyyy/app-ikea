import { Schema, SchemaTypes, Types, model } from "mongoose"

const entrepriseSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "entreprise"
export default model("Entreprise", entrepriseSchema, collectionName)
