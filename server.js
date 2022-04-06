const express = require('express')
const cards = require('./routes/cards')
const app = express()
const PORT = process.env.PORT || 3000
const path =require('path')
const exphbs  = require('express-handlebars')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//parse 
app.use(express.json())
app.use(express.urlencoded())

//routes
app.use('/cards',cards)





//static path
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => res.render('home'))
app.listen(PORT)
  