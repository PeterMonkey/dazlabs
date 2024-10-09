import axios from 'axios'
import { BACKEND_URI } from '../config.js'

export type UpdateData = {
    breed?: string,
    origin?: string,
    image?: string
}

export const getCats = async (skip: number, limit: number) => {
    try {
        const cats = await axios.get(`${BACKEND_URI}?skip=${skip}&limit=${limit}`)
        return cats.data.cats
    } catch (error) {
        console.error(error)
    }
}

export const create = async (breed: string, origin: string, image: string) => {
    try {
        const cat = await axios.post(`${BACKEND_URI}/create`, {
            breed,
            origin,
            image
        })
        return cat.data
    } catch (error) {
        console.error(error)
    }
}

export const updateCat = async (id: string, data: UpdateData) => {
    try {
        const cat = await axios.patch(`${BACKEND_URI}/update/${id}`, data)
        return cat.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteCat = async (id: string) => {
    try {
        const cat = await axios.delete(`${BACKEND_URI}/delete/${id}`)
        return cat.data
    } catch (error) {
        console.error(error)
    }
}