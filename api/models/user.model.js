const { model, Schema } = require('mongoose')

const userSchema = new Schema({
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
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxLength: 20,
    },
    role: {
        type: String,
        enum: ['Admin', 'Author'],
        default: 'Author'
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const User = model('User', userSchema)

module.exports = User