const { Router } = require('express')
const authorsRoutes = require('./authors.routes')
const categoriesRoutes = require('./categories.routes')
const articlesRoutes = require('./articles.routes')
const { adminOnly } = require('../../lib')

const router = Router()

router.use('/authors', adminOnly, authorsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/articles', articlesRoutes)

module.exports = router