import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";

const route = Router()
const authcontroller = new AuthController()

route.post('/register', authcontroller.register)
route.post('/login', authcontroller.login)

export default route;