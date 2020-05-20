const record = require('../record')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expence-required'

// 設定資料庫連結
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  record.create(
    {
      name: '午餐',
      category: 'food',
      date: "2019-05-20",
      amount: 100,
    },
    {
      name: '晚餐',
      category: 'food',
      date: "2019-05-20",
      amount: 90,
    },
    {
      name: '電影',
      category: 'entertainment',
      date: "2019-05-19",
      amount: 220,
    },
    {
      name: '公車',
      category: 'traffic',
      date: "2019-05-19",
      amount: 15,
    },
    {
      name: '衛生紙',
      category: 'home',
      date: "2019-05-19",
      amount: 110,
    },
    {
      name: '生日禮物',
      category: 'else',
      date: "2019-05-15",
      amount: 110,
    },
  )
})


