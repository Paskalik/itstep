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
        '<div class="footer"></div>'
    )
    $('.footer').html('<div>places filled<br>' + filled + '</div><div>out of places available<br>' + all + '</div>')
    $('.blocks').append($block)
  /*  let $block = document.createElement('div')
    $block.className = 'block'
    let $header = document.createElement('div')
    $header.className = 'header'
    let $circle = document.createElement('div')
    $circle.className = 'circle'
    $circle.attr('data-circleconfig', '{"color": "red", "graduation": 4, "fill": 3}')
    let $footer = document.createElement('div')
    $footer.className = 'footer'
    $header.textContent = name.toUpperCase()
    $footer.append('<div>places filled<br>' + filled + '</div><div>out of places available<br>' + all + '</div>')
    $block.append($header)
    $block.append($circle)
    $block.append($footer)
    $blocks.append($block)*/
}

export {createCity, createRegion, createSchool}
