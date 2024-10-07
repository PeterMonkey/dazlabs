import express from 'express'
import cors from 'cors'
import { connection } from './database/connect.js'

const app = express()

app.use(cors())

connection()
.then(response => response)
.catch(err => err)

app.listen("8080", () => console.log('Server Up on port 8080'))

export default app