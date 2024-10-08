import { Schema, model } from "mongoose";

export interface ICats {
    breed: string,
    origin: string,
    image: string,
}

export const catSchema = new Schema<ICats>({
    breed: {type: String, required: true},
    origin: {type: String, required: true},
    image: {type: String, required: true},
})

const CatModel = model<ICats>('Cats', catSchema)

export default CatModel