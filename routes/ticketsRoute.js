import express from 'express'
import * as ticketsController from '../controllers/ticketsController.js'

const router = express.Router()

router
    .route('/')
    .get(ticketsController.getAllTickets)
    .post(ticketsController.createTicket)
router
    .route('/:id')
    .delete(ticketsController.deleteTicket)
    .patch(ticketsController.patchTicket)
router.get(
    '/top-3-tickets',
    ticketsController.top3Tickets,
    ticketsController.getAllTickets
)

router.route('/get-stats').get(ticketsController.ticketsStats)

export default router
