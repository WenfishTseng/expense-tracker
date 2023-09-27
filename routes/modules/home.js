const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')

router.get("/", (req, res) => {
    const userId = req.user._id
    Category.find()
        .lean()
        .then(categories => {
            Record.find({ userId })
                // populate 要以使用 Schema.Types.ObjectId 的欄位名稱
                .populate("categoryId")
                .lean()
                .sort({ date: "desc" })
                .then(records => {
                    let totalAmount = 0

                    records.forEach(record => {
                        totalAmount += record.amount
                    })
                    res.render("index", { categories, records, totalAmount })
                })
        })
})
router.get('/search', (req, res) => {
    const userId = req.user._id
    const categoryId = req.query.category
    let totalAmount = 0

    if (!categoryId) {
        return res.redirect('/')
    }

    Category.find()
        .lean()
        .then(categories => {
            categories.forEach(data => {
                if (String(data._id) === categoryId) {
                    data.selected = true
                } else {
                    data.selected = false
                }
            })
            Record.find({ userId, categoryId })
                .populate("categoryId")
                .lean()
                .sort({ date: "desc" })
                .then(records => {
                    records.forEach(record => {
                        totalAmount += record.amount
                    })
                    res.render("index", { categories, records, totalAmount })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})
module.exports = router