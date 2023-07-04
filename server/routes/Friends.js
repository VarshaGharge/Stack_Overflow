import express from 'express'

import { addFriend } from '../controllers/Friends.js'
const router = express.Router()

router.post('/Add/:id', addFriend)

export default router