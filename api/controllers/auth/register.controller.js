const { validationError, errorMsg } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class RegisterCtrl {
    register = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body

            if(password == confirmPassword) {
                const hash = bcrypt.hashSync(password, 10)

                await User.create({name, email, phone, address, password: hash})

                res.status(201).send({
                    message: 'Thank you for registering'
                })
            } else {
                validationError(next, {
                    password: 'The password field is not confirmed',
                })
            }
        } catch(error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new RegisterCtrl