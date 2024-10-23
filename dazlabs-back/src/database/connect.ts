import { connect } from "mongoose";
import axios from "axios";
import CatModel from "../models/cat.models.ts";

export async function connection(): Promise<void> {
    const dbUri = process.env.DB_URI || ''
    const urlCats = process.env.API_CATS_URL || ''
    const apiKey = process.env.X_RAPIDAPI_KEY
    try {
        await connect(dbUri)
        // async function syncData(){
        //     try {
        //         const cats = await axios.get(urlCats, {
        //             headers: {
        //                 "x-rapidapi-key": `${apiKey}`
        //             }
        //         })
        //         const catData = cats.data
        //         catData.map(async (cat:any) => {
        //             return await CatModel.create({
        //                 breed: cat.breed,
        //                 origin: cat.origin,
        //                 image: cat.img
        //             })
        //         })
        //         console.log('Datos sincronizados')
        //     } catch (error) {
        //         console.error('Error al sincronizar datos:', error);
        //     }
        // }
        // //setInterval(syncData, 24 * 60 * 60 * 1000);
        // syncData()

        console.log('Database connected')
    } catch (error) {
        console.error(error)
    }
}
