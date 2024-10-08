import { Router, Request, Response } from "express"; 
import { CatServices } from "../services/cats.services.ts";

const route = Router()
const catServices = new CatServices()

/**
 * @swagger
 * components:
 *   schemas:
 *     Jedi:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Jedi
 *         name:
 *           type: string
 *           description: The name of the Jedi
 *       example:
 *         id: 1
 *         name: Luke Skywalker
 */

/**
 * @swagger
 * tags:
 *   name: Jedis
 *   description: The Jedis managing API
 */

route.post('/create', catServices.createCat)
route.get('/', catServices.getCats)
route.get('/:id', catServices.getCatById)
route.patch('/update/:id', catServices.updateCat)
route.delete('/delete/:id', catServices.deleteCat)

export default route;