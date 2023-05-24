import { Schema, SchemaTypes, Types, model } from "mongoose"

const materiauSchema = Schema(
  {
    _id: { type: SchemaTypes.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    description: {type: String, required: true}, // description of the materiau, to display on its page
    entreprise: {type: SchemaTypes.ObjectId,required:true } // id of the entreprise that sells the materiau
  }
  // { versionKey: false } // Permet de supprimer le "__v" si besoin
)

const collectionName = "materiau"
export default model("Materiaux", materiauSchema, collectionName)