const { model, Schema } = require('mongoose')

const User = model('User', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxLength: [20, 'The phone must be less than 20 characters'],
    },
    role: {
        type: String,
        enum: ['Admin', 'Author'],
        default: 'Author'
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = User