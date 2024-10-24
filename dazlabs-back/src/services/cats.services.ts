import { Response, Request } from "express";
import CatModel, { ICats } from "../models/cat.models.ts";
import axios from "axios";

interface CustomRequest extends Request<{}, {}, {}, QueryParams> {}

interface QueryParams {
  skip: number;
  limit: number;
}

export class CatServices {
        
    async createCat(newCat: ICats): Promise<ICats | any> {
        try {
            //const {breed, origin, image} = req.body;
    
            const cats = await CatModel.create(newCat)
            return cats
            
        } catch (error) {
            throw error
        }
    }

    async getCats(skip: number, limit: number): Promise<Response<ICats> | any>{
       
        try {
            const cats = await CatModel.find().skip(skip).limit(limit)
            return cats
            
        } catch (error) {
            throw error
        }
    }

    async getCatById(id: string): Promise<Response<ICats> | any> {
        //const id = req.params.id
        try {
            const cat = await CatModel.findById(id)
            if(cat === null){
                throw {
                    error: true,
                    status: 404,
                    message: "Elemento no encontrado"
                }
            }
            return cat
        } catch (error) {
            throw {
                error: true,
                status: 404,
                message: "Elemento no encontrado"
            }
        }
    }

    async updateCat(id: string, updateData:any): Promise<Response | any>{
        try {
            // const id = req.params.id;
    
            // const updateData = req.body;
    
            const cat = await CatModel.findByIdAndUpdate({_id: id}, updateData)
            return cat
    
        } catch (error) {
            throw error
        }
    }

    async deleteCat(id: string): Promise<Response | any>{
        try {
            //const id = req.params.id;
            const cat = await CatModel.findByIdAndDelete({_id: id})
            return cat
    
        } catch (error) {
            throw {
                error: true,
                status: 404,
                message: "Elemento no encontrado"
            }
        }
    }

    async getCatsByBreed(breedName: string) {
        try {
            const cat = await CatModel.findOne({breed: breedName})
            return cat
        } catch (error) {
            throw error
        }
    }

    async getApiCatsByBreed(breedName: string) {
        const urlCats = process.env.API_CATS_URL || ''
        const apiKey = process.env.X_RAPIDAPI_KEY
        try {
            const cats = await axios.get(`${urlCats}/breed/${breedName}`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`
                }
            })
            // const newCat = {
            //     breed: cats.data[0].breed,
            //     origin: cats.data[0].origin,
            //     image: cats.data[0].image
            // }
            // await CatModel.create(newCat)
            return cats
            
        } catch (error) {
            console.error(error)
        }
    }
}