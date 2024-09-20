const { Router } = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')
const { auth } = require('../lib')

const router = Router()

router.use('/auth', authRoutes)
router.use('/profile', auth, profileRoutes)

module.exports = router