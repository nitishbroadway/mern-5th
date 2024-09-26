const { errorMsg, validationError, notFoundMsg } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class AuthorsCtrl {
    index = async (req, res, next) => {
        try {
            const authors = await User.find({role: 'Author'})

            res.send(authors)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address, status } = req.body

            if (password == confirmPassword) {
                const hash = bcrypt.hashSync(password, 10)

                await User.create({ name, email, phone, address, password: hash, status })

                res.status(201).send({
                    message: 'Author created'
                })
            } else {
                validationError(next, {
                    password: 'The password field is not confirmed',
                })
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const author = await User.findOne({ role: 'Author', _id: id })

            if(author) {
                res.send(author)
            } else {
                notFoundMsg(next, 'Author')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, phone, address, status } = req.body

            if (await User.findOne({ role: 'Author', _id: id })) {
                await User.findByIdAndUpdate(id, { name, phone, address, status })

                res.send({
                    message: 'Author updated'
                })
            } else {
                notFoundMsg(next, 'Author')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            if (await User.findOne({ role: 'Author', _id: id })) {
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'Author deleted'
                })
            } else {
                notFoundMsg(next, 'Author')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new AuthorsCtrl