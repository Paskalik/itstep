'use strict';

$(document).ready(() => {
    const $items = $('li');
    const $divs = $('#description').find('div')
    $items.click(function() {
        const myClass = $(this).attr('data-fruit')
        $items.css('background-color', 'gray')
        $(this).css('background-color', 'dimgrey')
        $divs.addClass('invisible')
            $divs.each(function () {
                if (($(this).attr('data-fruit') === myClass)) {
                    $(this).removeClass('invisible')
                }
            })
        })
})