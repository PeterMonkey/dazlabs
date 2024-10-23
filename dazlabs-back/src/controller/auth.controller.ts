import { Response, Request, NextFunction } from "express";
import { IUser } from "../models/user.models.ts";
import { AuthService } from "../services/auth.services.ts";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';


const authService = new AuthService()

export class AuthController {

    async register(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        try {
            const user = await authService.register(name, email, password)
            res.status(201).json({
                message: "Usuario registrado correctamente",
                accesToken: user.token
            })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const user: IUser | null = await authService.login(email, password)
            if(!user){
                res.status(401).json({
                    message: `Ususario con email: ${email}, no encontrado`
                })
                return
            }
            const hash = CryptoJS.SHA256(password).toString()
            const isMatch = hash === user?.password
            if(!isMatch){
                res.status(401).json({
                    message: "Contraseña invalida"
                })
                return
            }
            const token = jwt.sign({id: user?._id}, 'my-secret', {expiresIn: '1h'})
            res.status(200).json({
                accesToken: token
            })
        } catch (error) {
            next(error)
        }
    }
}