import { Response, Request, Handler } from "express";
import CatModel, { ICats } from "../models/user.models.js";

export class CatServices {
        
    async createCat(req: Request, res: Response): Promise<Response>{
        try {
            const {breed, origin, image} = req.body;
    
            const newCat = {
                breed,
                origin,
                image,
            }
    
            await CatModel.create(newCat)
            return res.status(200).json({
                ok: true,
                response: newCat
            })
            
        } catch (error) {
            throw new Error()
        }
    }

    async getCats(req: Request, res: Response): Promise<Response<ICats>>{
        try {
            const cats = await CatModel.find()
            return res.json({
                cats
            })
        } catch (error) {
            throw new Error()
        }
    }

    async updateCat(req: Request, res: Response): Promise<Response>{
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
            return res.status(200).json({
                ok: true,
                message: `Cat with id ${id} updated`
            }) 
    
        } catch (error) {
            throw new Error()
        }
    }

    async deleteCat(req: Request, res: Response): Promise<Response>{
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
}