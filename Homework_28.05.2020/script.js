'use strict';

$(document).ready(function($) {
    let $stars = $('.block')

    $stars.click(function() {
        $stars.css('color', 'black')
        let $index = $stars.index($(this))
        for (let i = 0; i <= $index; i++) {
            $stars.eq(i).css('color', 'orange')
        }
    })
})