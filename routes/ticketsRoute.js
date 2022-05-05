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

export default router
