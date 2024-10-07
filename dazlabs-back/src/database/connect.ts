import { connect } from "mongoose";

export async function connection(): Promise<void> {
    try {
        await connect('mongodb://localhost:27017/db')
        console.log('Database connected')
    } catch (error) {
        console.error(error)
    }
}
