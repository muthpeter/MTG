const db = require('../config/database')
const express = require('express')
const router = express.Router()
const Cards = require('../modells/Cards')
const scraper = require('../routes/scraper')
const targets = require('../config/Targets')

// add a new entry to the database. needs name and price parameters

router.post('/save/:id', (req,res)=> {
    
    Cards.create({
        name : req.body.id,
        price : req.params.id
    })
    .then(()=> {
        res.redirect('/cards')
               })
    .catch(err=>console.log(err))
    
    })

router.post('/add',(req,res) =>{

let name = req.query.name
let price = req.query.price

console.log(name, price)
    Cards.create({
     name,
     price
 })
 .then(()=> {
     res.send('/list')
            })
 .catch(err=>console.log(err))
 
})
 
// delete an entry from the database by id

router.post('/delete', async (req,res) =>{
    console.log(`deleting card ${req.body.id}`)
  //  delete the last row from cards
    await Cards.destroy({where: {id:  req.body.id}}).then(() => {
    }).catch(err =>console.log(err))

    Cards.update({name: 'price'} ,{where: {id :1}})

    res.redirect('/cards')

})

// list the database

router.get('/list',(req,res)  =>{
    Cards.findAll()
        .then(cards =>{
        res.send(cards)
        }).catch(err => {console.log(err)
                            res.sendStatus(400)})
})


// scrape mtggoldfish.com for the price , the scrape location/card name pairs are stored in ../config/Targets

router.get('/mtg',   async (req,res)  =>{


   var price =  await scraper(targets.find(el => el.name === req.query.name).priceLocation)
    var name = req.query.name
   res.render('result',{name,price})
    


    

}
)

router.get('/', (req,res) => {
    Cards.findAll().then(
        cards => {
            res.render('cards',{cards})
        }
    ).catch(err =>console.log(err))
})





module.exports = router         