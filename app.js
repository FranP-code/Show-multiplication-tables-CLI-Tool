const url = 'https://multiplication-table-api.herokuapp.com'

const axios = require('axios')
const colors = require('colors')
const inquirer = require('inquirer')

const getData = async (numberToMultiply, initialNumber, limit) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: url,
            
            data: {
                "numberToMultiply": numberToMultiply,
                "initialNumber": initialNumber,
                "limit": limit
            }
        })
        
        return await response.data

    } catch (error) {

        return await error.response.data
    }   
}

function errorMessage(message) {

    console.log(message.brightRed)
}

function titleMessage(message) {

    console.log()
    console.log(message.bold.cyan)
    console.log()
}

function commonMessage(message) {

    console.log(message.brightGreen)
}

function thanksForUsingIt() {

    console.log('Thanks for use this tool. Francisco Pessano.'.bold.brightYellow)
}

inquirer
    .prompt([{

        name: 'numberToMultiplySelection',
        message: 'Put the number to find your multiplication table.',
        type: 'number',
        
        default: 10
    },
    {
        name: 'initialNumberSelection',
        message: 'Put the initial number of the table.',
        type: 'number',

        default: 0
    },
    {
        name: 'limitSelection',
        message: 'Put a limit (max 999)',
        type: 'number',

        default: 10
    }])

    .then(async (answers) => {

        const numberToMultiply = answers.numberToMultiplySelection
        const initialNumber = answers.initialNumberSelection
        const limit = answers.limitSelection

        const data = await getData(numberToMultiply, initialNumber, limit)
        // data.status
        // data.message
            
        if (data.status === 'error') {
            
            errorMessage(data.message)
            return
        }

        if (data.status !== 'success') {

            return
        }
        
        titleMessage('Here are your results:')

        data.message.forEach(count => {
    
            commonMessage(`  - ` + count)
        });
        
        console.log()
        thanksForUsingIt()
        console.log()
    })