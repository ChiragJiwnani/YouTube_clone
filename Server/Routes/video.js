import express from "express"
import { likevideocontroller } from "../Controllers/like.js";
import { viewscontroller } from "../Controllers/views.js";
import { uploadvideo,getallvideos } from "../Controllers/video.js";
import { historycontroller,deletehistory,getallhistorycontroller } from "../Controllers/History.js";
import { watchlatercontroller,getallwatchlatervontroller,deletewatchlater } from "../Controllers/watchlater.js";
import { likedvideocontroller,getalllikedvideo,deletelikedvideo } from "../Controllers/likedvideo.js";
import { pointsController } from '../Controllers/points.js'
import upload from "../Helper/filehelper.js";
import auth  from "../middleware/auth.js"
const routes=express.Router();

routes.post("/uploadvideo",upload.single("file"),uploadvideo)

routes.get("/getvideos",getallvideos)
routes.patch('/like/:id',likevideocontroller)
routes.patch('/view/:id',viewscontroller)
routes.patch('/points/:id',pointsController)

routes.post('/history',historycontroller)
routes.get('/getallhistory',getallhistorycontroller)
routes.delete('/deletehistory/:userid',deletehistory)

routes.post('/watchlater',watchlatercontroller)
routes.get('/getallwatchlater',getallwatchlatervontroller)
routes.delete('/deletewatchlater/:videoid/:viewer',auth,deletewatchlater)

routes.post('/likevideo',likedvideocontroller)
routes.get('/getalllikevide',getalllikedvideo)
routes.delete('/deletelikevideo/:videoid/:viewer',auth,deletelikedvideo)

export default routes