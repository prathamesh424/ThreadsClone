import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text : {type: "string" , required: true} ,
    author: {type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',required: true  } ,
    comunity : {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Community'} ,
    createdAt: { type: Date, default: Date.now },
    parentId : {type :String} ,
    children : [
        {type :mongoose.Schema.Types.ObjectId ,
        ref: 'Thread'
        } ,
        
    ]
})


export const Thread = mongoose.models.Thread || mongoose.model('Thread' , threadSchema);    