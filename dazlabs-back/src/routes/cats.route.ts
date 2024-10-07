import { Router, Request, Response } from "express"; 
import { CatServices } from "../services/cats.services.ts";

const route = Router()
const catServices = new CatServices()

route.post('/create', (req: Request, res: Response) => {
    const {name, origin, temperament, description, image, colors} = req.body;

    const newCat = {
        name,
        origin,
        temperament,
        description,
        image,
        colors
    }

    return catServices.createCat(newCat);
})