import express from 'express'
import ticketsRouter from './routes/ticketsRoute.js'

const app = express()
app.use(express.json())
app.use('/api/v1/tickets', ticketsRouter)

app.route('/').get((req, res) => {
    res.sendStatus(200)
})

export default app
