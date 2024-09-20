const { errorMsg, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")

class ProfileCtrl {
    details = async (req, res, next) => {
        res.send(req.user)
    }
    
    update = async (req, res, next) => {
        try {
            const {name, phone, address} = req.body

            await User.findByIdAndUpdate(req.user._id, {name, phone, address})

            res.send({
                message: 'Profile updated'
            })
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    password = async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id).select('+password')

            const { oldPassword, newPassword, confirmPassword } = req.body

            if(bcrypt.compareSync(oldPassword, user.password)) {
                if(newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, 10)

                    await User.findByIdAndUpdate(user._id, {password: hash})

                    res.send({
                        message: 'Password changed'
                    })
                } else {
                    validationError(next, {
                        newPassword: 'The password is not confirmed'
                    })
                }
            } else {
                validationError(next, {
                    oldPassword: 'The password is incorrect'
                })
            }
        } catch(error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new ProfileCtrl