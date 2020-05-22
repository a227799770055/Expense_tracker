const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
require('./config/mongoose')


// 設定模板引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
  helpers: {
    getImage: function (category, category_image) {
      return category_image[category]
    },
  }
}))
app.set('view engine', 'hbs')

// 設定 middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定路由
const routes = require("./routes/index")
app.use(routes)

// 設定監聽
app.listen(port, () => {
  console.log(`app is listening at localhost: ${port} `)
})