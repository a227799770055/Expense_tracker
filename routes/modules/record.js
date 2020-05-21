const express = require('express')
const router = express.Router()
const record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})
module.exports = router

router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  console.log(id)
  return record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})