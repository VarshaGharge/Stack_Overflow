import express from 'express'

import { PostContent, getAllPosts, deletePost ,likePost, sharePost } from '../controllers/Posts.js'
import auth from '../middleware/auth.js';



const router = express.Router();

router.post('/postUpload', PostContent);
router.get('/see', getAllPosts);
router.delete('/delete/:id', auth, deletePost);
router.patch("/vote/:id", likePost);
router.patch("/share/:id", sharePost);

export default router