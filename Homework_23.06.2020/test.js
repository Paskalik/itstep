//1
//Done


//Запуск файла: npm start
//2
console.log('Hello world')

//3
function getString(str) {
    return str.repeat(15)
}
console.log(getString('Hello world\n'))

//4
function getOdd(min,max) {
    for (let i = min; i <= max; i++) {
        if (i % 2 !== 0) {
            console.log(i)
        }
    }
}
getOdd(1,50)

//5
function getMathOper() {
    const numFir = process.argv[2]
    const oper = process.argv[3]
    const numSec = process.argv[4]
    return eval(numFir + oper + numSec)
}
console.log(getMathOper())
