import { connect } from "mongoose";

export async function connection(): Promise<void> {
    const dbUri = process.env.DB_URI || ''
    try {
        await connect(dbUri)
        console.log('Database connected')
    } catch (error) {
        console.error(error)
    }
}
