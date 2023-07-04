import express from 'express'

import { createSubscriber, addSubscriber } from '../controllers/Subscriber.js'

const router = express.Router();

router.post('/pay', createSubscriber)
router.post('/success', addSubscriber)

export default router