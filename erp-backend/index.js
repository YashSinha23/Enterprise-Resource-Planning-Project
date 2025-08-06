import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ordersRoute from './routes/orders.js'
import inventoryRoute from './routes/inventory.js'
import transactionsRoute from './routes/transactions.js'
import employeesRoute from './routes/employees.js'

dotenv.config()
const app = express()

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use('/api/orders', ordersRoute)
app.use('/api/inventory', inventoryRoute)
app.use('/api/transactions', transactionsRoute)
app.use('/api/employees', employeesRoute)
app.use('/api/attendance', employeesRoute) // Alternative endpoint for attendance

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AlmedERP Backend Server is running',
    timestamp: new Date().toISOString(),
    eTimeOfficeIntegration: 'Enabled'
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  console.log(`Employee API: http://localhost:${PORT}/api/employees/attendance`)
})