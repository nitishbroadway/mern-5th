const { Router } = require('express')
const { Cms } = require('../../controllers')
const { upload } = require('../../lib')

const router = Router()

router.route('/')
    .get(Cms.ArticlesCtrl.index)
    .post(upload().single('image'), Cms.ArticlesCtrl.store)

router.route('/:id')
    .get(Cms.ArticlesCtrl.show)
    .put(upload().single('image'), Cms.ArticlesCtrl.update)
    .patch(upload().single('image'), Cms.ArticlesCtrl.update)
    .delete(Cms.ArticlesCtrl.destroy)

module.exports = router