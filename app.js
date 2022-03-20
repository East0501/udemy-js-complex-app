const { json } = require('express')
const session = require('express-session')
const express = require('express')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express()

let sessionOptions = session({
  secret: "JavaScript is cool",
  store: MongoStore.create({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  kie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
}) 

app.use(sessionOptions)
app.use(flash())

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app