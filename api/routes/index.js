const { Router } = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')
const frontRoutes = require('./front.routes')
const cmsRoutes = require('./cms')
const { auth, notFoundMsg } = require('../lib')

const router = Router()

router.use('/auth', authRoutes)
router.use('/profile', auth, profileRoutes)

router.use('/cms', auth, cmsRoutes)

router.use(frontRoutes)

router.use((req, res, next) => {
    notFoundMsg(next, 'URL')
})

module.exports = router