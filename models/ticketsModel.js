import mongoose from 'mongoose'

const ticketsSchema = mongoose.Schema({
    nameTour: {
        type: String,
        required: [true, 'Tour name is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    tourGuide: {
        type: String,
        default: 'Jonas'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Tickets', ticketsSchema)
