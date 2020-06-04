'use strict';

let $pics = [
    './img/Cat_1.jpg',
    './img/Cat_2.jpg',
    './img/Cat_3.jpg',
    './img/Cat_4.jpg',
    './img/Cat_5.jpg',
    './img/Cat_6.jpg',
    './img/Cat_7.jpg',
    './img/Cat_8.jpg',
    './img/Cat_9.jpg',
    './img/Cat_10.jpg'
]
let $slideCount = $pics.length
let $index = 0
let $gallery = $('#gallery')
let $resize = $('#resize')
let $playStop = $('#plStBtn')

$(document).ready(function() {
        $showNavBtns()

    $showSlide(0)
    $backgroundImg()

    $('.navBtn').click(function() {
        let ind = $('.navBtn').index($(this))
        $showSlide(ind)
        $index = ind
    })

    $('#firstBtn').click(function() {
        if (!$(this).hasClass('notAllowed')) {
            $showSlide(0)
            $index = 0
        }
    })

    $('#prevBtn').click(function() {
        if (!$(this).hasClass('notAllowed')) {
            $showSlide($index - 1)
            $index--
        }
    })

    $('#nextBtn').click(function() {
        if (!$(this).hasClass('notAllowed')) {
            $showSlide($index + 1)
            $index++
        }
    })

    $('#lastBtn').click(function() {
        if (!$(this).hasClass('notAllowed')) {
            $showSlide($slideCount - 1)
            $index = $slideCount - 1
        }
    })

    $playStop.click(function() {
        if (!$(this).hasClass('notAllowed')) {
            if ($(this).attr('data-stop') === "true")
            {
                $playSlider()
            }
            else {
                $stopSlider()
            }
        }
    })

    $resize.click(() => {
        $resized()
    })

})

function $backgroundImg(){
    let slide = $('.slideImg')
    slide.height(slide.width());

    $(window).resize(function(){
        slide.height(slide.width());
    });
}

function $showSlide(i) {
    let url = 'url(' + $pics[i] + ')'
    $('.slideImg').css('backgroundImage', url)
    $checkNavBtns(i)
    $checkPlayBtns(i)

}

function $showNavBtns() {
    for (let i = 0; i < $slideCount; i++) {
        let btn = '<div class="navBtn"></div>'
        $('#navBtns').append(btn)
    }
}

function $checkNavBtns(i) {
    let navBtn = $('.navBtn')
    navBtn.each((index, element) => {
        if (index === i) {
            $(element).css('backgroundColor', 'gray')
        }
        else {
            $(element).css('backgroundColor', 'white')
        }
    })
}

function $checkPlayBtns(i) {
    if (i === 0) {
        $('#firstBtn').addClass('notAllowed')
        $('#prevBtn').addClass('notAllowed')
    }
    else {
        $('#firstBtn').removeClass('notAllowed')
        $('#prevBtn').removeClass('notAllowed')
    }
    if (i === ($slideCount - 1)) {
        $('#nextBtn').addClass('notAllowed')
        $('#lastBtn').addClass('notAllowed')
        $playStop.addClass('notAllowed')
    }
    else {
        $('#nextBtn').removeClass('notAllowed')
        $('#lastBtn').removeClass('notAllowed')
        $playStop.removeClass('notAllowed')
    }
}

function $resized() {
    if ($resize.attr('data-size') === 'true') {
        $gallery.width(500)
        $gallery.height(500)
        $resize.empty()
        $resize.html('<img src="https://img.icons8.com/color/20/000000/expand.png"/>')
        $resize.attr('data-size', 'false')
    }
    else {
        $gallery.width($(document).width())
        $gallery.height($(document).height())
        $resize.empty()
        $resize.html('<img src="https://img.icons8.com/color/20/000000/collapse.png"/>')
        $resize.attr('data-size', 'true')
    }
}

function $playSlider() {
    let slideImg = $('.slideImg')
    $blockAll()
    $playStop.empty()
    $playStop.html('<img src= "https://img.icons8.com/color/20/000000/stop.png"/>')
    $playStop.attr('data-stop', 'false')
    slideImg.animate({ opacity: 1 }, 1000,"linear", function(){
            $index++;
            if($index === $slideCount){
                slideImg.stop()
                $playStop.empty()
                $playStop.html('<img src= "https://img.icons8.com/color/20/000000/play.png"/>')
                $unblockAll()
                $checkPlayBtns($slideCount - 1)
            } else {
                slideImg.css("background-image", "url("+$pics[$index]+")");
                $checkNavBtns($index)
                slideImg.animate({ opacity: 1 }, 1000,function(){
                    //  setTimeout($slider,1000);
                    $playSlider()
                })
            }
    })
}

function $stopSlider() {
    $('.slideImg').stop()
    $playStop.empty()
    $playStop.html('<img src= "https://img.icons8.com/color/20/000000/play.png"/>')
    $playStop.attr('data-stop', 'true')
    $unblockAll()
    $checkPlayBtns($index)
}

function $blockAll() {
    $('#firstBtn').addClass('notAllowed')
    $('#prevBtn').addClass('notAllowed')
    $('#nextBtn').addClass('notAllowed')
    $('#lastBtn').addClass('notAllowed')
}

function $unblockAll() {
    $('#firstBtn').removeClass('notAllowed')
    $('#prevBtn').removeClass('notAllowed')
    $('#nextBtn').removeClass('notAllowed')
    $('#lastBtn').removeClass('notAllowed')
}