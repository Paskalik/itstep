'use strict';

$(document).ready(() => {
    const $menu = $('li:first-child')

    const $list = $('ul');

    $menu.click(function () {
        $list.toggleClass('full');
        if ($list.hasClass('full')) {
            const $items = $('li:not(:first-child)');
            $items.each(function () {
                $(this).hover(
                    () => {
                        $(this).css('background-color', 'dimgrey')
                    },
                    () => {
                        $(this).css('background-color', 'gray')
                    })
            })
        }
    })
})