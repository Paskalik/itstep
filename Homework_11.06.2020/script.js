'use strict';

/* в процессе */

import {$data} from './data.js'

$(document).ready(function($) {
    $('.circle').circle(
        {
            color: 'inherit',
            graduation: 10
        }
    )
    console.log($data)
})