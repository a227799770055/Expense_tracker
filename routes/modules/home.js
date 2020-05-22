const express = require('express')
const router = express.Router()
const record = require('../../models/record')
const category_image = {
  'food': '<i class="fa fa-cutlery  fa-2x" aria-hidden="true"></i>',
  'entertainment': '<i class="fa fa-film  fa-2x" aria-hidden="true" ></i>',
  'traffic': '<i class="fa fa-bus fa-2x" aria-hidden="true" ></i>',
  'home': '<i class="fa fa-home fa-2x" aria-hidden="true" ></i>',
  'else': '<i class="fa fa-pencil fa-2x" aria-hidden="true" ></i>',
}
const categoryChinese = {
  'food': '餐飲',
  'traffic': '交通',
  'entertainment': '休閒娛樂',
  'home': '家居物業',
  'else': '其他'
}

const sorting = {
  "dateAsc": { index: "date", type: -1 },
  "dateDes": { index: "date", type: 1 },
  "amountAsc": { index: "amount", type: -1 },
  "amountDes": { index: "amount", type: 1 },
}



router.get('/', (req, res) => {
  let totalAmount = 0
  record.find()
    .lean()
    .sort({ date: -1 })
    .then(record => {
      record.forEach(item => { totalAmount += item.amount })
      res.render('index', { record, category_image, totalAmount })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  let totalAmount = 0
  const categorySelect = req.body.categorySelect
  const categoryItem = categoryChinese[categorySelect]
  if (categorySelect != "") {
    record.find({ category: categorySelect })
      .lean()
      .then(record => {
        record.forEach(item => { totalAmount += item.amount })
        res.render('index', { record, category_image, totalAmount, categoryItem })
      })
      .catch(error => console.log(error))
  } else {
    record.find()
      .lean()
      .sort({ date: -1 })
      .then(record => {
        record.forEach(item => { totalAmount += item.amount })
        res.render('index', { record, category_image, totalAmount })
      })
      .catch(error => console.log(error))
  }
})


module.exports = router
