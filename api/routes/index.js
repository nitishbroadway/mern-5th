const { Router } = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

module.exports = router