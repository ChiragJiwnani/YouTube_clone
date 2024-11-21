import express from "express"

import { postcomment,getcomment,deletecomment,editcomment,likeComment,dislikeComment } from "../Controllers/Comment.js"
import auth from "../middleware/auth.js"
const router=express.Router()

router.post("/post",postcomment)
router.get('/get',getcomment)
router.delete('/delete/:id',deletecomment)
router.patch('/edit/:id',editcomment)
router.patch('/like/:id', likeComment); // Correct like route
router.patch('/dislike/:id', dislikeComment); // Correct dislike route

export default router