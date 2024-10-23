import { Router } from "express";
import { AuthService } from "../services/auth.services.ts";

const route = Router()
const authService = new AuthService()

route.post('/register', authService.register)
route.post('/login', authService.login)

export default route;