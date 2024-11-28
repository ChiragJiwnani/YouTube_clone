import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechaneldata,getallchanels } from "../Controllers/channel.js";
const routes=express.Router();

routes.post('/user/login',login)
routes.patch('/user/update/:id',updatechaneldata)
routes.get('/user/getallchannel',getallchanels)

export default routes;
