import ticketsModel from '../models/ticketsModel.js'

const getError = (res, err) => {
    res.status(404).json({ status: 'fail', reason: err })
    console.log(err)
}

class APIFeature {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        console.log(this.queryString)
        // Build Query
        const queryObj = { ...this.queryString }
        const excludedQuery = ['page', 'sort', 'limit', 'fields']
        excludedQuery.forEach((value) => delete queryObj[value])

        // Convert query to mongoose method
        const convertQueryObj = JSON.stringify(queryObj)
        const convertedQueryObj = convertQueryObj.replace(
            /(lt|lte|gt|gte)\b/g,
            (match) => `$${match}`
        )
        console.log(convertedQueryObj)

        // Filter
        this.query.find(JSON.parse(convertedQueryObj))

        return this
        // let getTickets = ticketsModel.find(JSON.parse(convertedQueryObj))
    }

    sort() {
        // Sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query.sort(sortBy)
            // getTickets = getTickets.sort(sortBy)
        } else {
            this.query.sort('createdAt')
            // getTickets = getTickets.sort('-createdAt')
        }

        return this
    }

    limit() {
        // Limiting Fields
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query.select(fields)
            // getTickets = getTickets.select(fields)
        } else {
            this.query.select('-__v')
            // getTickets = getTickets.select('-__v')
        }
        return this
    }

    pagination() {
        // Pagination
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        // if (this.queryString.page) {
        //     const numTours = await this.query.countDocuments()
        //     if (skip > numTours) throw new Error('This page does not exist')
        // }
        this.query.skip(skip).limit(limit)
        // getTickets = getTickets.skip(skip).limit(limit)
        return this
    }
}

const top3Tickets = (req, res, next) => {
    req.query.limit = 3
    req.query.sort = '-ratingAverage,price'
    req.query.fields = 'name,price,difficulty'
    next()
}

const getAllTickets = async (req, res) => {
    try {
        // Execute Query
        const features = new APIFeature(ticketsModel.find(), req.query)
            .filter()
            .sort()
            .limit()
            .pagination()
        const tickets = await features.query

        return res.status(200).json({
            status: 'success',
            data: tickets
        })
    } catch (err) {
        return getError(res, err)
    }
}

const createTicket = async (req, res) => {
    try {
        const data = req.body
        const newTicket = await ticketsModel.create(data)
        return res.status(201).json({
            status: 'success',
            data: newTicket
        })
    } catch (err) {
        return getError(res, err)
    }
}

const deleteTicket = async (req, res) => {
    try {
        const id = req.params.id
        await ticketsModel.findByIdAndDelete(id)
        return res.sendStatus(204)
    } catch (err) {
        return getError(res, err)
    }
}

const patchTicket = async (req, res) => {
    try {
        const id = req.params.id
        const newData = await ticketsModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        return res.status(200).json(newData)
    } catch (err) {
        return getError(res, err)
    }
}

const ticketsStats = async (req, res) => {
    try {
        const data = await ticketsModel.aggregate([
            {
                $match: { price: { $gte: 0 } }
            },
            {
                $group: {
                    _id: '$difficulty',
                    total: { $sum: '$price' }
                }
            },
            {
                $sort: {
                    total: 1
                }
            }
        ])
        return res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        return getError(res, err)
    }
}

export {
    getAllTickets,
    createTicket,
    deleteTicket,
    patchTicket,
    top3Tickets,
    ticketsStats
}
