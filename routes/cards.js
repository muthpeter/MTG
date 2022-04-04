const db = require('../config/database')
const express = require('express')
const router = express.Router()
const Cards = require('../modells/Cards')
const scraper = require('../routes/scraper')
const targets = require('../config/Targets')

// add a new entry to the database. needs name and price parameters

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

router.delete('/:id', (req,res) =>{

    //delete the last row from cards
    Cards.destroy({where: {id:  req.params.id}}).then(() => {
        console.log(`the card with id: ${req.params.id} deleted`)
        res.send(Cards.body)
        res.sendStatus(200)
    }).catch(err =>console.log(err))

    //Cards.update({name: 'price'} ,{where: {id :1}})


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

router.get('/mtg', (req,res) =>{


    scraper(targets.find(el => el.name === req.query.name).priceLocation)
    .then(price => res.send(price))
    .catch(err => console.log(err))

console.log(targets.find(el => el.name === req.query.name)) 

}
)

module.exports = router         