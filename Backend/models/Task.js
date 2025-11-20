

import mongoose  from "mongoose";

const taskSchema = new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref: "User",required:true},
    title:{type:String,required:true},
    defscription:{type:String},
    complted:{type:Boolean,default:false},
    createdasAt:{type:Date,default:Date.now},
});

export default mongoose.model("Task",taskSchema);