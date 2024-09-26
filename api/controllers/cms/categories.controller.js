const { errorMsg, notFoundMsg } = require("../../lib")
const { Category } = require("../../models")

class CategoriesCtrl {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status } = req.body

            await Category.create({ name, status })

            res.status(201).send({
                message: 'Category created'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                res.send(category)
            } else {
                notFoundMsg(next, 'Category')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, status } = req.body

            if (await Category.findById(id)) {
                await Category.findByIdAndUpdate(id, { name, status })

                res.send({
                    message: 'Category updated'
                })
            } else {
                notFoundMsg(next, 'Category')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            if (await Category.findById(id)) {
                await Category.findByIdAndDelete(id)

                res.send({
                    message: 'Category deleted'
                })
            } else {
                notFoundMsg(next, 'Category')
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new CategoriesCtrl