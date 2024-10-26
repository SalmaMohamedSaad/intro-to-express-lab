// Import Express
const express = require('express')
// Create an Express app
const app = express()
// Import Validator
const validate = require('validator')
// Listen for requests on port 3000
app.listen(3001, () => {
  console.log('Listening on port 3001')
})
//4. Filter Shoes by Query Parameters
//Task: Create a route /shoes that filters the list of shoes based on query parameters.
const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]
let filteredShoesStr = ''

app.get('/shoes', (req, res) => {
  let min_price = req.query['min-price']
  let max_price = req.query['max-price']
  let type = req.query['type']
  if (min_price && max_price && type) {
    if (
      !validate.isAlpha(type) ||
      !validate.isNumeric(min_price) ||
      !validate.isNumeric(max_price)
    ) {
      filteredShoesStr = '<h1>Please Enter Valid Product data!</h1>'
    } else {
      shoes.forEach((shoe) => {
        if (
          shoe.price >= min_price &&
          shoe.price <= max_price &&
          shoe.type == type
        ) {
          filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
        }
      })
    }
  } else if (min_price && !max_price && !type) {
    //user only inputs Minimum Price
    if (!validate.isNumeric(min_price)) {
      filteredShoesStr = '<h1>Please Enter Valid Minimum Price!</h1>'
    } else {
      shoes.forEach((shoe) => {
        if (shoe.price >= min_price) {
          filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
        }
      })
    }
  } else if (max_price && !min_price && !type) {
    // user only inputs Maximum price
    if (!validate.isNumeric(max_price)) {
      filteredShoesStr = '<h1>Please Enter Valid Maximum Price!</h1>'
    } else {
      shoes.forEach((shoe) => {
        if (shoe.price <= max_price) {
          filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
        }
      })
    }
  } else if (!max_price && !min_price && type) {
    if (validate.isNumeric(type)) {
      filteredShoesStr = '<h1>Please Enter Valid Shoe Type!</h1>'
    } else {
      // user only inputs Type
      shoes.forEach((shoe) => {
        if (shoe.type == type) {
          filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
        }
      })
    }
  } else if (max_price && min_price && !type) {
    //user only inputs Max and Min price
    shoes.forEach((shoe) => {
      if (shoe.price >= min_price && shoe.price <= max_price) {
        filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
      }
    })
  } else if (!max_price && min_price && type) {
    //user only inputs Min price and type
    shoes.forEach((shoe) => {
      if (shoe.price >= min_price && shoe.type === type) {
        filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
      }
    })
  } else if (max_price && !min_price && type) {
    //user only inputs Max price and type
    shoes.forEach((shoe) => {
      if (shoe.price <= max_price && shoe.type === type) {
        filteredShoesStr += `<h2> Product Name: <label style="color:red;">${shoe.name}</label> Product Price: <label style="color:red;">${shoe.price}</label> Product Type: <label style="color:red;">${shoe.type}</label></h2> <br/>`
      }
    })
  }
  res.send(filteredShoesStr)
  filteredShoesStr = ''
})

// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter></index-parameter>
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]
app.get('/collectibles/:index', (req, res) => {
  if (
    !validate.isNumeric(req.params.index) ||
    req.params.index > collectibles.length
  ) {
    res.send('<h1>This item is not yet in stock. Check back soon!</h1>')
  } else {
    res.send(
      `<h1>So, you want the <label style="color:red;"> ${
        collectibles[req.params.index].name
      }</label> ? For <label style="color:red;"> ${
        collectibles[req.params.index].price
      } </label>, it can be yours!</h1>`
    )
  }
})

// 1. Be Polite, Greet the User
//Task: Create a route that responds to URLs like /greetings/<username-parameter></username-parameter>
app.get('/greetings/:name', (req, res) => {
  res.send(`<h1>Hello there, ${req.params.name}</h1>`)
})
//2. Rolling the Dice
//Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
app.get('/roll/:number', (req, res) => {
  if (validate.isNumeric(req.params.number)) {
    let rand = Math.floor(Math.random() * req.params.number)
    res.send(`<h1>You rolled a ${rand}</h1>`)
  } else {
    res.send(`You must specify a number.`)
  }
})
