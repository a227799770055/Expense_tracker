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

router.get('/new', (req, res) => {
  res.render('new')
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/new', (req, res) => {
  const body = req.body
  const name = body.name
  const category = body.category
  const date = body.date
  const amount = body.amount
  console.log(body.name == "")
  return record.create({
    name,
    category,
    date,
    amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return record.findById(id)
    .then(record => {
      record = Object.assign(record, body)
      return record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})



module.exports = router
