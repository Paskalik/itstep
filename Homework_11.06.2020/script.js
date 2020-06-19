'use strict';

/* в процессе */
import * as $DOMBuilder from './DOMBuilder.js'

$(document).ready(function($) {
    $('.circle').circle(
        {
            color: 'inherit',
            graduation: 10
        },
    $DOMBuilder.createCity()
    )
})