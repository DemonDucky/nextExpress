import ticketsModel from '../models/ticketsModel.js'

const getAllTickets = async (req, res) => {
    const getTickets = await ticketsModel.find()
    console.log(getTickets)
    return res.status(200).json({
        status: 'success',
        data: getTickets
    })
}

const createTicket = async (req, res) => {
    try {
        const data = req.body
        console.log(req.body)
        const newTicket = await ticketsModel.create(data)
        return res.status(201).json({
            status: 'success',
            data: newTicket
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteTicket = async (req, res) => {
    try {
        const id = req.params.id
        await ticketsModel.findByIdAndDelete(id)
        return res.sendStatus(204)
    } catch (err) {
        console.log(err)
    }
}

const patchTicket = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.body.nameTour)
        const newData = await ticketsModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        })
        return res.status(200).json(newData)
    } catch (err) {
        console.log(err)
    }
}

export { getAllTickets, createTicket, deleteTicket, patchTicket }
