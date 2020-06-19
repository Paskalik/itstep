import {$data, $countPer} from './data.js'

let $name = $('h4')
let $back = $('#back')
let $blocks = $('.blocks')

function $fillBlocks(indexRegion = null,indexSchool = null) {
    $blocks.empty()
    if (indexSchool) {
        let $region = $data.regions[indexRegion]
        let $school = $region.schools[indexSchool]
        let $classes = $school.classes
        $name.text('CITY: ' + $data.cityName.toUpperCase() + ' -> REGION: ' +
            $region.regionName.toUpperCase() + ' -> ' + $school.schoolName)
        $classes.forEach((el) => {
            $createBlock(el.className, el.allPlaces, el.filledPlaces)
        })
    }
    else if (indexRegion) {
        let $region = $data.regions[indexRegion]
        let $schools = $region.schools
        $name.text('CITY: ' + $data.cityName.toUpperCase() + ' -> REGION: ' +
            $region.regionName.toUpperCase())
        $schools.forEach((el, index) => {
            $createBlock(el.schoolName, el.allPlaces, el.filledPlaces, indexRegion, index)
        })
        $back.css('display', 'block')
    }
    else {
        let $regions = $data.regions
        $name.text('CITY: ' + $data.cityName.toUpperCase())
        $regions.forEach((el, index) => {
            $createBlock(el.regionName, el.allPlaces, el.filledPlaces, index)
        })
        $back.css('display', 'none')
    }
}

/*function $createRegion(indexRegion) {
    $blocks.empty()
    let $region = $data.regions[indexRegion]
    let $schools = $region.schools
    $name.text('CITY: ' + $data.cityName.toUpperCase() + ' -> REGION: ' +
        $region.regionName.toUpperCase())
    $schools.forEach((el, index) => {
        $createBlock(el.schoolName, el.allPlaces, el.filledPlaces, indexRegion, index)
    })
    $back.css('display', 'block')
}*/

/*function $createSchool(indexRegion, indexSchool) {
    $blocks.empty()
    let $region = $data.regions[indexRegion]
    let $school = $region.schools[indexSchool]
    let $classes = $school.classes
    $name.text('CITY: ' + $data.cityName.toUpperCase() + ' -> REGION: ' +
        $region.regionName.toUpperCase() + ' -> ' + $school.schoolName)
    $classes.forEach((el) => {
        $createBlock(el.className, el.allPlaces, el.filledPlaces)
    })
}*/

function $createBlock(name,all,filled,region = null, school = null) {
    let $block
    if (school !== null) {
        $block = $('<div class="block" data-region = ' + region + ' data-school = ' + school + '></div>')
    }
    else if (region !== null) {
        $block = $('<div class="block" data-region = ' + region + '></div>')
    }
    else {
        $block = $('<div class="block"></div>')
    }
    let $info = $countPer(all, filled)
    let $fill = $info.$per/10
    let $color = $info.$color
    $block.append(
        '<div class="header">' + name.toUpperCase() + '</div>' +
        '<div class="circle" data-circleconfig=\'{"color": "' + $color + '", "fill": ' + $fill + '}\'></div>' +
        '<div class="footer"><div>places filled<br>' + filled + '</div>' +
        '<div>out of places available<br>' + all + '</div></div>'
    )
    $blocks.append($block)

    $('.circle').circle(
        {
            graduation: 10
        }
    )
}
export {$fillBlocks}
