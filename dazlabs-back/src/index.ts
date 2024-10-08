import express from 'express'
import cors from 'cors'
import catRoute from './routes/cats.route.ts'
import { connection } from './database/connect.js'

const app = express()

app.use(cors())
app.use(express.json())

connection()
.then(response => response)
.catch(err => err)

//routes
app.use(catRoute)

app.listen("8080", () => console.log('Server Up on port 8080'))

export default app