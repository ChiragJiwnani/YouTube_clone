import express from "express"

import { postcomment,getcomment,deletecomment,editcomment,likeComment,dislikeComment } from "../Controllers/Comment.js"
import auth from "../middleware/auth.js"
const router=express.Router()

router.post("/post",postcomment)
router.get('/get',getcomment)
router.delete('/delete/:id',deletecomment)
router.patch('/edit/:id',editcomment)
router.patch('/like/:id', likeComment); 
router.patch('/dislike/:id', dislikeComment); 

export default router