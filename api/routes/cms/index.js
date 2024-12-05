const { Router } = require('express')
const authorsRoutes = require('./authors.routes')
const categoriesRoutes = require('./categories.routes')
const articlesRoutes = require('./articles.routes')
const commentsRoutes = require('./comments.routes')
const { adminOnly } = require('../../lib')

const router = Router()

router.use('/authors', adminOnly, authorsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/articles', articlesRoutes)
router.use('/comments', commentsRoutes)

module.exports = router