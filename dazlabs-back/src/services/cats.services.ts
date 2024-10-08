import { Response, Request } from "express";
import CatModel, { ICats } from "../models/user.models.js";

export class CatServices {
        
    async createCat(req: Request, res: Response): Promise<Response>{
        const {breed, origin, image} = req.body;

        const newCat = {
            breed,
            origin,
            image,
        }

        await CatModel.create(newCat)
        return res.json({
            ok: true,
            response: newCat
        })
    }

    async getCats(req: Request, res: Response): Promise<Response<ICats>>{
        const cats = await CatModel.find()
        return res.json({
            cats
        })
    }

    async updateCat(req: Request, res: Response): Promise<Response>{
        const id = req.params.id;

        const updateData = req.body;

        await CatModel.updateOne({_id: id}, updateData)

        return res.json({
            ok: true,
            message: `Cat with id ${id} updated`
        })
    }

    async deleteCat(req: Request, res: Response){
        const id = req.params.id;
        await CatModel.deleteOne({_id: id})

        return res.json({
            ok: true,
            message: `Cat with id ${id} deleted`
        })
    }
}