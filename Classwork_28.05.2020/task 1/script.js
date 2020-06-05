'use strict';

let $fruits = [
    {
        "name": "Mango",
        "img": "img/mango-icon.png",
        "description": "A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees " +
            "belonging to the flowering plant genus Mangifera, cultivated mostly for their edible fruit."
    },
    {
        "name": "Orange",
        "img": "img/orange-icon.png",
        "description": "The orange is the fruit of various citrus species in the family Rutaceae (see list of plants " +
            "known as orange); it primarily refers to Citrus × sinensis, which is also called sweet orange, to " +
            "distinguish it from the related Citrus × aurantium, referred to as bitter orange."
    },
    {
        "name": "Pineapple",
        "img": "img/pineapple-icon.png",
        "description": "The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most " +
            "economically significant plant in the family Bromeliaceae. The pineapple is indigenous to South " +
            "America, where it has been cultivated for many centuries."
    },
    {
        "name": "Papaya",
        "img": "img/papaya-icon.png",
        "description": "The papaya (/pəˈpaɪə/, US: /pəˈpɑːjə/) (from Carib via Spanish), papaw (/pəˈpɔː/) or pawpaw " +
            "(/ˈpɔːpɔː/) is the plant Carica papaya, one of the 22 accepted species in the genus Carica of the " +
            "family Caricaceae. Its origin is in the tropics of the Americas, perhaps from Central America and " +
            "southern Mexico."
    },
    {
        "name": "Grapefruit",
        "img": "img/grapefruit-icon.png",
        "description": "The grapefruit (Citrus × paradisi) is a subtropical citrus tree known for its relatively " +
            "large sour to semi-sweet, somewhat bitter fruit. Grapefruit is a citrus hybrid originating in Barbados " +
            "as an accidental cross between the sweet orange (C. sinensis) and pomelo (or shaddock; C. maxima), both " +
            "of which were introduced from Asia in the seventeenth century."
    },
    {
        "name": "Pear",
        "img": "img/pear-icon.png",
        "description": "The pear (/ˈpɛər/) tree and shrub are a species of genus Pyrus /ˈpaɪrəs/, in the family " +
            "Rosaceae, bearing the pomaceous fruit of the same name. Several species of pear are valued for their " +
            "edible fruit and juices while others are cultivated as trees."
    }
]

$(document).ready(() => {
    $loadFruits()
    const $items = $('#title>div');
    $loadDescription(0)
    $items.click(function() {
        $items.css('background-color', '#2e8b8b')
        $(this).css('background-color', '#2d7d7d')
        let $index = $items.index($(this))
        $loadDescription($index)
    })

    function $loadFruits() {
        let $title = $('#title')
        let $count = $fruits.length
        for (let i = 0; i < $count; i++) {
            let $fruitTitle = '<div "data-fruit"="' + $fruits[i]["name"] + '">' + $fruits[i]["name"] + '</div>'
            $title.append($fruitTitle)
        }
    }

    function $loadDescription(i) {
        let $description = $('#description')
        let $descTitle = '<h4>' + $fruits[i]["name"] + '</h4>'
        let $descImg = '<img src="' + $fruits[i]["img"] + '" alt="fruit" class="wrap">'
        let $descText = '<span class="wrap">' + $fruits[i]["description"] + '</span>'
        $description.empty()
        $description.append($descTitle).append($descImg).append($descText)
        $('.wrap').wrapAll('<div class="wrapper">')
    }
})