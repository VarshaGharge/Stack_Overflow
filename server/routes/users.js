import express from 'express'

import { signup, login } from '../controllers/auth.js'
import { getAllUsers, updatePlan, updateProfile } from "../controllers/Users.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.post("/updatePlan/:id", updatePlan);

export default router