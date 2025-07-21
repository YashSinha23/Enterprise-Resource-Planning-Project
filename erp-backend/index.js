import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ordersRoute from './routes/orders.js'
// import other routes

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/orders', ordersRoute)
// use other routes similarly

app.listen(5000, () => console.log("Server running on port 5000"))
