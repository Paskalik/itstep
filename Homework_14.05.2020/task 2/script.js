'use strict'

$(document).ready(() => {
    const $btnCol = $('.color')
    const $fruits = $('.wrapper').find('div')
    $btnCol.click(function () {
        let myClass = $(this).attr('id')
        $clearShadow()
        $(this).addClass('shadow')
        /* Use 'each', because class 'shadow' is added to all 'fruits' without using it */
        $fruits.each(function () {
            if ($(this).hasClass(myClass)) {
                $(this).addClass('shadow')
            }
        })
    })
    function $clearShadow() {
        const $shadow = $('.shadow');
        if ($shadow) {
            $shadow.removeClass('shadow')
        }
    }
})