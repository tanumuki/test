const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        

    },
    completed:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
   

},{
    timestamps:true
})

const ToDo=mongoose.model('ToDo',taskSchema)
module.exports=ToDo