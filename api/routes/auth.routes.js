const { Router } = require('express')
const { login } = require('../controllers/auth/login.controller')
const { register } = require('../controllers/auth/register.controller')

const router = Router()

router.post('/login', login)

router.post('/register', register)

module.exports = router