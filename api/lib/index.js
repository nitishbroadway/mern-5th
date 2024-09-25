const jwt = require('jsonwebtoken')
const { User } = require('../models')

const validationError = (next, validation) => {
    next({
        message: 'There is some validation error',
        validation,
        status: 422,
    })
}

const errorMsg = (error, next) => {
    console.log(error)

    if ('errors' in error) {
        let validation = {}

        for (let k in error.errors) {
            validation[k] = error.errors[k].message
        }

        validationError(next, validation)
    } else if ('code' in error && error.code == 11000) {
        validationError(next, {
            email: 'Given email is already in use'
        })
    } else {
        next({
            message: 'Problem while processing request',
            status: 400,
        })
    }
}

const auth = async(req, res, next) => {
    try {
        if ('authorization' in req.headers) {
            const token = req.headers.authorization.split(' ').pop()

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(decoded.uid)

            if(user) {
                req.user = user
                next()
            } else {
                next({
                    message: 'Authorization token is invalid',
                    status: 401
                })
            }
        } else {
            next({
                message: 'Authorization token is missing',
                status: 401
            })
        }
    } catch(error) {
        next({
            message: 'Authorization token is invalid',
            status: 401
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == 'Author') {
        next({
            message: 'Access Denied',
            status: 403,
        })
    } else {
        next()
    }
}

module.exports = { validationError, errorMsg, auth, adminOnly }