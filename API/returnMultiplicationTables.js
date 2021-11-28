const express = require('express')
const app = express()

const port = 3001

app.use(express.json())

app.get('/', (req, res) => {

    const error = (err) => {

        res.status('400').json({

            'status': 'error',
            'message': err
        })
    }

    const data = req.body
    
    if (!data) {

        error(`Data not sended`)
        return
    }

    //!Template
    /*
        
        {
            "numberToMultiply" = 5,
            "initialNumber" = 0,
        }
    */

    const numberToMultiply = data.numberToMultiply
    let initialNumber = data.initialNumber
    let limit = data.limit
   
    if (!data.hasOwnProperty("numberToMultiply")) {
        
        error(`Number to multiply don't defined`)
        return
    }

    if (typeof(numberToMultiply) !== 'number') {

        error(`Number to multiply is not a number`)
        return 
    }

    if (!data.hasOwnProperty("initialNumber") || typeof(initialNumber) !== 'number' || initialNumber < 0) {

        initialNumber = 0
    }

    if (!data.hasOwnProperty("limit") || typeof(limit) !== 'number' || limit < 0 || limit > 999) {

        limit = 10
    }

    let result = []
    let i = initialNumber

    while (i <= (initialNumber + limit)) {
        
        result.push(`${numberToMultiply} x ${i} = ${numberToMultiply * i}`)
        i++
    }

    res.json({

        'status': 'success',
        'message': result
    })
})

app.listen(process.env.PORT || port)