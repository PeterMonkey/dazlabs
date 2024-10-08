import { Response, Request } from "express";
import CatModel, { ICats } from "../models/user.models.js";
import axios from "axios";

interface CustomRequest extends Request<{}, {}, {}, QueryParams> {}

interface QueryParams {
  skip: number;
  limit: number;
}

export class CatServices {
        
    async createCat(req: Request, res: Response): Promise<Response | any> {
        try {
            const {breed, origin, image} = req.body;
    
            const newCat = {
                breed,
                origin,
                image,
            }
    
            await CatModel.create(newCat)
            return res.status(201).json({
                ok: true,
                response: newCat
            })
            
        } catch (error) {
            throw new Error()
        }
    }

    async getCats(req: CustomRequest, res: Response): Promise<Response<ICats> | any>{
        const {skip, limit} = req.query
       
        try {
            const cats = await CatModel.find().skip(skip).limit(limit)
            if(cats.length > 0){
                return res.status(200).json({
                    cats
                })
            }
            return res.status(404).json({
                message: 'Elementos no encontrados'
            })
        } catch (error) {
            throw new Error()
        }
    }

    async getCatById(req: Request, res: Response): Promise<Response<ICats> | any> {
        const id = req.params.id
        try {
            const cat = await CatModel.findById(id)
            if(cat === null){
                return res.status(404).json({
                    ok: false,
                    message: 'Elemento no encontrado'
                })
            }
            return res.status(200).json({
                ok: true,
                cat
            })
        } catch (error) {
            throw new Error()
        }
    }

    async updateCat(req: Request, res: Response): Promise<Response | any>{
        try {
            const id = req.params.id;
    
            const updateData = req.body;
    
            const cat = await CatModel.findByIdAndUpdate({_id: id}, updateData)
            if(cat === null){
                return res.status(404).json({
                    ok: false,
                    message: "Elemento no encontrado"
                })
            }
            return res.status(201).json({
                ok: true,
                message: `Cat with id ${id} updated`
            }) 
    
        } catch (error) {
            throw new Error()
        }
    }

    async deleteCat(req: Request, res: Response): Promise<Response | any>{
        try {
            const id = req.params.id;
            const cat = await CatModel.findByIdAndDelete({_id: id})
            if(cat === null) {
                return res.status(404).json({
                    ok: false,
                    message: "Elemento no encontrado"
                })
            }
            return res.json({
                ok: true,
                message: `Cat with id ${id} deleted`
            })
    
        } catch (error) {
            throw new Error()
        }
    }

    async apiCats() {
        const urlCats = process.env.API_CATS_URL || ''
        const apiKey = process.env.X_RAPIDAPI_KEY
        try {
            const cats = await axios.get(urlCats, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`
                }
            })
            return cats.data
            
        } catch (error) {
            console.error(error)
        }
    }
}