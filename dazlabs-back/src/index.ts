import express from 'express'
import cors from 'cors'
import catRoute from './routes/cats.route.ts'
import { connection } from './database/connect.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

connection()
.then(response => response)
.catch(err => err)

//routes
app.use(catRoute)

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))

export default app