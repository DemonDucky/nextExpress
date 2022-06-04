import mongoose from 'mongoose'

const ticketsSchema = mongoose.Schema(
    {
        nameTour: {
            type: String,
            trim: true,
            required: [true, 'Tour name is required']
        },
        price: {
            type: Number,
            required: [true, 'Tour price is required']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        tourGuide: {
            type: String,
            default: 'Jonas'
        },
        duration: {
            type: Number,
            requires: [true, 'Duration is required']
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'Max group size is required']
        },
        ratingsAverage: {
            type: Number,
            default: 4.5
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        difficulty: {
            type: String,
            required: [true, 'Difficulty is required']
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        imageCover: {
            type: String,
            required: [true, 'Image is required']
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now()
        },
        startDate: [Date]
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

ticketsSchema.virtual('pricex10').get(function () {
    return this.price * 10
})

ticketsSchema.pre('save', function (next) {
    console.log('saving...')
    next()
})

ticketsSchema.post('save', function (doc, next) {
    console.log('saved')
    console.log(doc)
    next()
})

export default mongoose.model('Tickets', ticketsSchema)
