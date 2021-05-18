const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: String
        }
    ]
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        if(!returnedObject.likes){
            returnedObject.likes = 0
        }
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog