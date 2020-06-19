'use strict';

/* в процессе */
import * as $DOMBuilder from './DOMBuilder.js'

$(document).ready(function($) {
    $DOMBuilder.createCity()

    $('.circle').circle(
        {
            color: 'inherit',
            graduation: 10
        }
    )
})