//npm start

//1
function getLetterZ() {
    const count = process.argv[2]
    if (count < 3) {
        console.log('Very small letter')
    }
    else if (count > 10) {
        console.log('Very big letter')
    }
    else {
        console.log('*'.repeat(count))
        for (let i = 0; i < count - 2; i++) {
            console.log(' '.repeat(count - 2 - i) + '*')
        }
        console.log('*'.repeat(count))
    }
}
getLetterZ()

//2
//version 1
function getFileOne() {
    const json = require('./data.json')
    for (let i = 0; i < json.length; i++) {
        console.log('Страна - ' + json[i].name + '(' + json[i].code + ')')
    }
}
getFileOne()

//version 2
function getFileTwo() {
    const fs = require("fs")
    let obj = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    for (let i = 0; i < obj.length; i++) {
        console.log('Страна - ' + obj[i].name + '(' + obj[i].code + ')')
    }
}
getFileTwo()