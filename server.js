const express = require('express')
const cards = require('./routes/cards')
const app = express()
const PORT = process.env.PORT || 3000
const path =require('path')
const exphbs  = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


//setting up handlebars
app.engine('handlebars', exphbs.engine({handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', 'handlebars');


//parse 
app.use(express.json())
app.use(express.urlencoded())

//routes
app.use('/cards',cards)





//static path
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => res.render('home', {layout : 'landing'}))

app.listen(PORT)
   