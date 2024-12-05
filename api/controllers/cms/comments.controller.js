const { errorMsg, notFoundMsg } = require("../../lib")
const { Comment, Article } = require("../../models")
const { unlinkSync } = require('node:fs')

class CommentsCtrl {
    index = async (req, res, next) => {
        try {
            let comments = await Comment.find()

            let temp = []

            for(let comment of comments) {
                const article = await Article.findById(comment.articleId)
                temp.push({
                    ...comment.toObject(),
                    article,
                })
            }

            res.send(temp)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const comment = await Comment.findById(id)

            if (comment) {
                await Comment.findByIdAndDelete(id)

                res.send({
                    message: 'Comment deleted'
                })
            } else {
                notFoundMsg(next, 'Comment')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new CommentsCtrl