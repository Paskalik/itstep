'use strict';

$(document).ready(() => {
    const $red = $('#red')
    const $green = $('#green')
    const $orange = $('#orange')
    const $yellow = $('#yellow')

    const $redAll = $('.red')
    const $greenAll = $('.green')
    const $orangeAll = $('.orange')
    const $yellowAll = $('.yellow')

    $red.click(function () {
        $clearShadow()
        $redAll.addClass('shadow')
    })

    $green.click(function () {
        $clearShadow()
        $greenAll.addClass('shadow')
    })

    $orange.click(function () {
        $clearShadow()
        $orangeAll.addClass('shadow')
    })

    $yellow.click(function () {
        $clearShadow()
        $yellowAll.addClass('shadow')
    })

    $green.click(function () {
        $greenAll.addClass('shadow')
    })

    $orange.click(function () {
        $orangeAll.addClass('shadow')
    })

    $yellow.click(function () {
        $yellowAll.addClass('shadow')
    })

    function $clearShadow() {
        const $shadow = $('.shadow');
        if ($shadow) {
            $shadow.removeClass('shadow')
        }
    }
})