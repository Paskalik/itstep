const $btnArrow = $('.arrow');
const $arrow = $('.leftArrow');
const $left = $('.left');
$btnArrow.click(function () {
    $left.toggleClass('display');
    $arrow.toggleClass('leftArrow');
    $arrow.toggleClass('rightArrow');
})