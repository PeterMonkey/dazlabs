import { Response, Request, NextFunction } from "express";
import { ICats } from "../models/cat.models.ts";
import { CatServices } from "../services/cats.services.ts";

interface CustomRequest extends Request<{}, {}, {}, QueryParams> {}

interface QueryParams {
  skip: number;
  limit: number;
}

const catServices = new CatServices()

export class CatsController {

    async createCat(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        try {
            const {breed, origin, image} = req.body;
    
            const newCat = {
                breed,
                origin,
                image,
            }
    
            await catServices.createCat(newCat)
            return res.status(201).json({
                ok: true,
                response: newCat
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getCats(req: CustomRequest, res: Response, next: NextFunction): Promise<Response<ICats> | any>{
        const {skip, limit} = req.query
       
        try {
            const cats = await catServices.getCats(skip, limit)
            if(cats.length > 0){
                return res.status(200).json({
                    cats
                })
            }
            return res.status(404).json({
                message: 'Elementos no encontrados'
            })
        } catch (error) {
            next(error)
        }
    }

    async getCatById(req: Request, res: Response, next: NextFunction): Promise<Response<ICats> | any> {
        const id = req.params.id
        try {
            const cat = await catServices.getCatById(id)
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
            next(error)
        }
    }

    async updateCat(req: Request, res: Response, next: NextFunction): Promise<Response | any>{
        try {
            const id = req.params.id;
    
            const updateData = req.body;
    
            const cat = await catServices.updateCat(id, updateData)
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
            next(error)
        }
    }

    async deleteCat(req: Request, res: Response, next: NextFunction): Promise<Response | any>{
        try {
            const id = req.params.id;
            const cat = await catServices.deleteCat(id)
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
            next(error)
        }
    }
}