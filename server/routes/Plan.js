import express from 'express'

import {  getAllPlans } from '../controllers/Plans.js'
import { createSubscriber } from '../controllers/Subscriber.js';
const router = express.Router()

router.get('/get', getAllPlans);
router.patch("/payment", createSubscriber);

export default router