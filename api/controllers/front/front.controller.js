const { errorMsg } = require("../../lib")
const { Article, Category, Comment } = require("../../models")

class FrontCtrl {
    home = async (req, res, next) => {
        try {
            const articles = await Article.find({status: true})

            res.send(articles)
        } catch(error) {
            errorMsg(error)
        }
    }
    
    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({status: true})

            res.send(categories)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    categoryById = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findOne({status: true, _id: id})

            if (category) {
                const articles = await Article.find({ status: true, categoryId: category._id })

                res.send({...category.toObject(), articles})
            } else {
                notFoundMsg(next, 'Category')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    articleById = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findOne({ status: true, _id: id })

            if (article) {
                const comments = await Comment.find({ articleId: article._id })

                res.send({ ...article.toObject(), comments })
            } else {
                notFoundMsg(next, 'Article')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    comment = async (req, res, next) => {
        try {
            const { id } = req.params

            const { name, email, content } = req.body

            Comment.create({name, email, content, articleId: id})

            res.send({
                message: 'Thank your for your comment.'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new FrontCtrl