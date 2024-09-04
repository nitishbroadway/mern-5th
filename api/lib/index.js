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

module.exports = { validationError, errorMsg }