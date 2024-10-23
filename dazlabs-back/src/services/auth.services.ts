import UserModel, { IUser } from "../models/user.models.ts";
import { Response, Request } from "express";
import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";

export class AuthService {

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = CryptoJS.SHA256(password).toString();
            await UserModel.create({
                name,
                email,
                password: hashedPassword
            })
            res.status(201).json({
                message: "Usuario registrado correctamente"
            })
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user: IUser | null = await UserModel.findOne({email})
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
            res.status(500).json({ message: 'Error logging in' });
        }
    }
}