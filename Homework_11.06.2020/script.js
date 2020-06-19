'use strict';

/* в процессе */
import * as $DOMBuilder from './DOMBuilder.js'

$(document).ready(function($) {
    let $indexRegion = -1
    let $indexSchool = -1

    $DOMBuilder.createCity()

    $('.circle').circle(
        {
            graduation: 10
        }
    )

    $('.block').on('click', function () {
        if ($(this).attr('data-school')) {
            $indexRegion = $(this).attr('data-region')
            $indexSchool = $(this).attr('data-school')
            $DOMBuilder.createSchool($indexRegion, $indexSchool)
        }
        else if ($(this).attr('data-region')) {
            $indexRegion = $(this).attr('data-region')
            $DOMBuilder.createRegion($indexRegion)
        }
    })
})