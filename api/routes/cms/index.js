const { Router } = require('express')
const authorsRoutes = require('./authors.routes')
const { adminOnly } = require('../../lib')

const router = Router()

router.use('/authors', adminOnly, authorsRoutes)

module.exports = router