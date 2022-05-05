import app from './server.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const db = process.env.DB.replace('PASSWORD', process.env.DB_PASSWORD)

mongoose.connect(db, () => console.log('connected to the database'))

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
