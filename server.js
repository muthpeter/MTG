const express = require('express')
const cards = require('./routes/cards')
const app = express()
const PORT = process.env.PORT || 3000
const path =require('path')



//parse 
app.use(express.json())
app.use(express.urlencoded())

//routes
app.use('/cards',cards)





//static path
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(PORT)
  