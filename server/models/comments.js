const { Schema, model } = require('mongoose');

const comments = new Schema ({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
},{toJSON:{ getters:true}})

module.exports = comments