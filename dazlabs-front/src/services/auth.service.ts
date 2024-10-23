import axios from 'axios'
import { BACKEND_URI } from '../config.js'

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URI}/auth/register`, {
            name,
            email,
            password
        })
        return response;
    } catch (error) {
        return error
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URI}/auth/login`, {
            email,
            password
        })
        return response;
    } catch (error) {
        return error
    }
}