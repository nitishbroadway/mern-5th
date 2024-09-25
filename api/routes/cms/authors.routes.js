const { Router } = require('express')
const { Cms } = require('../../controllers')

const router = Router()

router.route('/')
    .get(Cms.AuthorsCtrl.index)
    .post(Cms.AuthorsCtrl.store)

router.route('/:id')
    .get(Cms.AuthorsCtrl.show)
    .put(Cms.AuthorsCtrl.update)
    .patch(Cms.AuthorsCtrl.update)
    .delete(Cms.AuthorsCtrl.destroy)

module.exports = router