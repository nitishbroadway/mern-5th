const { model, Schema } = require('mongoose')

const Article = model('Article', new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    image: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Article