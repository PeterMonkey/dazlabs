import CatModel, { ICats } from "../models/user.models.js";

export class CatServices {
        
    async createCat(cat: Omit<ICats, '_id'>): Promise<ICats>{
        return await CatModel.create(cat)
    }
}