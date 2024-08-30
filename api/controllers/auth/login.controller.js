class LoginCtrl {
    login = async (req, res, next) => {
        res.send(req.body)
    }
}

module.exports = new LoginCtrl