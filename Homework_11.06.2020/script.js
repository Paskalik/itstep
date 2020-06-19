'use strict';

/* в процессе */
import * as $DOMBuilder from './DOMBuilder.js'

$(document).ready(function() {
    $DOMBuilder.$fillBlocks()
    click()
})

let $indexRegion, $indexSchool

function click() {
    $('.block').click(function () {
        if ($(this).attr('data-school')) {
            $indexRegion = $(this).attr('data-region')
            $indexSchool = $(this).attr('data-school')
            $DOMBuilder.$fillBlocks($indexRegion, $indexSchool)
        }
        else if ($(this).attr('data-region')) {
            $indexRegion = $(this).attr('data-region')
            $DOMBuilder.$fillBlocks($indexRegion)
        }
        click()
    })
}