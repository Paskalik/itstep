import {$data} from './data.js'

let $name = $('h4')

function createCity() {
    let $regions = $data.regions
    $name.text('CITY: ' + $data.cityName.toUpperCase())
    $regions.forEach((el) => {
        console.log(el.regionName,el.allPlaces,el.filledPlaces)
        createBlock(el.regionName,el.allPlaces,el.filledPlaces)
    })
}

function createRegion() {

}

function createSchool() {

}

function createBlock(name,all,filled) {
    let $block = $('<div class="block"></div>')
    $block.append(
        '<div class="header">' + name.toUpperCase() + '</div>' +
        '<div class="circle" data-circleconfig=\'{"color": "red", "graduation": 4, "fill": 3}\'></div>' +
        '<div class="footer"><div>places filled<br>' + filled + '</div>' +
        '<div>out of places available<br>' + all + '</div></div>'
    )
    $('.blocks').append($block)
}
export {createCity, createRegion, createSchool}
