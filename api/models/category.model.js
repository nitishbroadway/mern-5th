const { model, Schema } = require('mongoose')

const Category = model('Category', new Schema({
    name: {
        type: String,
        required: true,
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

module.exports = Category