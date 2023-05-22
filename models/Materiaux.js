import { Schema, SchemaTypes, Types, model } from "mongoose"

const materiauSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    tags: {type: Array, required: true},
    entreprise: {type: SchemaTypes.ObjectId,required:true }
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "materiau"
export default model("Materiaux", materiauSchema, collectionName)