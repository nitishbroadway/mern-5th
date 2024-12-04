const { errorMsg, notFoundMsg } = require("../../lib")
const { Article, Category } = require("../../models")
const { unlinkSync } = require('node:fs')

class ArticlesCtrl {
    index = async (req, res, next) => {
        try {
            let articles = await Article.find()

            let temp = []

            for(let article of articles) {
                const category = await Category.findById(article.categoryId)
                temp.push({
                    ...article.toObject(),
                    category,
                })
            }

            res.send(temp)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status, categoryId, content } = req.body
            
            let image = null

            if(req.file) {
                image = req.file.filename
            }

            await Article.create({ name, status, categoryId, content, image })

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
            const { name, status, content, categoryId } = req.body

            const article = await Article.findById(id)

            if (article) {
                let image = article.image

                if (req.file) {
                    image = req.file.filename

                    if(article.image) {
                        unlinkSync(`./uploads/${article.image}`)
                    }
                }

                await Article.findByIdAndUpdate(id, { name, status, categoryId, content, image })

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

            const article = await Article.findById(id)

            if (article) {
                if (article.image) {
                    unlinkSync(`./uploads/${article.image}`)
                }
                
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