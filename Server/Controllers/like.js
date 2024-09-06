import videofile from "../Models/videofile.js";
import mongoose from "mongoose";

export const likevideocontroller=async(req,res)=>{

    const { id: _id }=req.params;
    const Like=req.body;
    console.log("likevideocontroller:",_id,{Like})
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("video unavailable..")
    }
    try {
        const updatelike = await videofile.findByIdAndUpdate(
            _id,{$set:{"Like": Like }},
             { new: true }
        )
        res.status(200).json(updatelike)
    } catch (error) {
        res.status(400).json({ message: "An error occurred", error: error.message });
    }

}
