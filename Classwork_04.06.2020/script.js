'use strict';

$(document).ready(function($) {
    let $cards = [
        "&#10084;", "&#10084;",
        "&#9650;", "&#9650;",
        "&#9733;", "&#9733;",
        "&#9899;", "&#9899;",
        "&#9632;", "&#9632;"
    ]

    let $start = $('button')
    let $pair = 0
    let $timer
    let $box1 = undefined
    let $box2 = undefined

    let $newCards = $randomize($cards);
    $load($newCards);

    $start.click(() => {
        $('.card').addClass('hidden background')
    })

    $('.card').click(function () {
        if ($(this).hasClass("hidden")) {
            if ($box1 === undefined) {
                $box1 = $(this);
                $box1.removeClass("hidden").addClass("show");

                $timer = setTimeout(function () {

                    if ($box2 === undefined) {
                        if($box1.hasClass("show")) {
                            $box1.removeClass("show").addClass("hidden");
                        }
                        $box1 = undefined;
                    } else if ($box1.html() !== $box2.html()) {
                        $box1.removeClass("show").addClass("hidden");
                        $box1 = undefined;
                        $box2.removeClass("show").addClass("hidden");
                        $box2 = undefined;
                    }
                }, 3000);

            } else if ($box2 === undefined) {
                $box2 = $(this);
                $box2.removeClass("hidden").addClass("show");

                if ($box1.html() === $box2.html()) {
                    $pair += 1;
                    $box1 = undefined;
                    $box2 = undefined;
                }

            }
        }

        if ($pair === 5) {
            alert("Congrats! You have won!")
        }
    })
    function $load(cards) {
        for (let i = 0; i < $cards.length; i++) {
                let $html = '<div class="card"></div>'
                $('#card').append($html)
                $('.card').eq(i).html(cards[i]);
        }
    }

    function $randomize(array) {
        let index = array.length, temporaryValue, randomIndex ;
        while (0 !== index) {
            randomIndex = Math.floor(Math.random() * index);
            index -= 1;
            temporaryValue = array[index];
            array[index] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
})