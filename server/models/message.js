const  {Datatypes,Schema }= require ("mongoose")



const messageSchema = new Schema(
{
    messageId:{
        type:Schema.ObjectId
    },

    messageContent:{
        type:String

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    virtuals:true
}

)
messageSchema.virtual("messageCount").get(function(){
    return this.messageContent.length
})
module.exports= messageSchema