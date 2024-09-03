const { User } = require("../../models")

class RegisterCtrl {
    register = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body

            if(password == confirmPassword) {
                await User.create({name, email, phone, address})
            } else {
                next({
                    message: 'There is some validation error',
                    validation: {
                        password: 'The password field is not confirmed',
                    },
                    status: 422,
                })
            }
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = new RegisterCtrl