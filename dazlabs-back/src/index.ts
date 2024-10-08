import express from 'express'
import cors from 'cors'
import catRoute from './routes/cats.route.ts'
import { connection } from './database/connect.ts'
import swaggerUi from 'swagger-ui-express'
import specs from './swagger/swagger.config.ts'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

connection()
.then(response => response)
.catch(err => err)

//routes
app.use('/', catRoute)

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))

export default app