import { Schema, model } from "mongoose";

export interface ICats {
    name: string,
    origin: string,
    temperament: string,
    description: string,
    image: string,
    colors: string[]
}

export const catSchema = new Schema<ICats>({
    name: {type: String, required: true},
    origin: {type: String, required: true},
    temperament: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    colors: {type: [String], required: true}
})

const CatModel = model<ICats>('Cats', catSchema)

export default CatModel