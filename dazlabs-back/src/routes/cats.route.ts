import { Router} from "express"; 
import { CatsController } from "../controller/cats.controller.ts";

const route = Router()
const catsController = new CatsController()

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

route.post('/create', catsController.createCat)
route.get('/', catsController.getCats)
route.get('/:id', catsController.getCatById)
route.get('/breed/:breed', catsController.getCatsByBreed)
route.patch('/update/:id', catsController.updateCat)
route.delete('/delete/:id', catsController.deleteCat)

export default route;