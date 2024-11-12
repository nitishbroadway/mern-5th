const { Router } = require('express')
const { Front } = require('../controllers')

const router = Router()

router.get('/home', Front.FrontCtrl.home)
router.get('/categories', Front.FrontCtrl.categories)
router.get('/categories/:id', Front.FrontCtrl.categoryById)
router.get('/articles/:id', Front.FrontCtrl.articleById)
router.post('/articles/:id/comment', Front.FrontCtrl.comment)

module.exports = router