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


router.get('/', (req, res) => {

  record.find()
    .lean()
    .then(record => res.render('index', { record, category_image }))
    .catch(error => console.log(error))
})
module.exports = router
