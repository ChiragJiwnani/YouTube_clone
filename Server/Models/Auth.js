import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {type:String, require: true},
    name: {type:String},
    mobileNumber: { type: String, unique: true, required: false },
    desc:{type:String},
    joinedOn:{type:Date, default:Date.now},
    viewedVideos: { type: [mongoose.Schema.Types.ObjectId], ref: "videoFiles", default: [] }, // List of video IDs
    points: { type: Number, default: 0 }, 
})

export default mongoose.model('User', userSchema)