import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ordersRoute from './routes/orders.js'
import inventoryRoute from './routes/inventory.js'
import transactionsRoute from './routes/transactions.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/orders', ordersRoute)
app.use('/api/inventory', inventoryRoute)
app.use('/api/transactions', transactionsRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))