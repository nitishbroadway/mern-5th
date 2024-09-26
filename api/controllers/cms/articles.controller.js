const { errorMsg, notFoundMsg } = require("../../lib")
const { Article } = require("../../models")

class ArticlesCtrl {
    index = async (req, res, next) => {
        try {
            const articles = await Article.find()

            res.send(articles)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status, categoryId, content } = req.body

            await Article.create({ name, status, categoryId, content })

            res.status(201).send({
                message: 'Article created'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article) {
                res.send(article)
            } else {
                notFoundMsg(next, 'Article')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, status } = req.body

            if (await Article.findById(id)) {
                await Article.findByIdAndUpdate(id, { name, status })

                res.send({
                    message: 'Article updated'
                })
            } else {
                notFoundMsg(next, 'Article')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            if (await Article.findById(id)) {
                await Article.findByIdAndDelete(id)

                res.send({
                    message: 'Article deleted'
                })
            } else {
                notFoundMsg(next, 'Article')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new ArticlesCtrl