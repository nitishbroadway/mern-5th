const { model, Schema } = require('mongoose')

const Comment = model('Comment', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    articleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Comment