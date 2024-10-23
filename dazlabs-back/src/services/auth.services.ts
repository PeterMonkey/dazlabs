import UserModel, { IUser } from "../models/user.models.ts";
import { Response, Request } from "express";
import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";

export class AuthService {

    async register(name: string, email: string, password: string) {
        try {
            const hashedPassword = CryptoJS.SHA256(password).toString();
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword
            })
            const token = jwt.sign({id: user?._id}, 'my-secret', {expiresIn: '1h'})
            return {
                user,
                token
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const user: IUser | null = await UserModel.findOne({email})
            return user;
        } catch (error) {
            throw error;
        }
    }
}