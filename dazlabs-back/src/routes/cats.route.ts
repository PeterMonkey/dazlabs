import { Router, Request, Response } from "express"; 
import { CatServices } from "../services/cats.services.ts";

const route = Router()
const catServices = new CatServices()

route.post('/create', catServices.createCat)
route.get('/', catServices.getCats)
route.patch('/update/:id', catServices.updateCat)
route.delete('/delete/:id', catServices.deleteCat)

export default route;