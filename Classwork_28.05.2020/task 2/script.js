'use strict';

$(document).ready(() => {
    $('#open').click(function () {
        $('#fade').fadeIn();
    })

    $('#close').click(function() {
        $('#fade').fadeOut();
        return false;
    })

    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('#fade').fadeOut();
        }
    });

    $('#fade').click(function(e) {
        if ($(e.target).closest('#popup').length === 0) {
            $(this).fadeOut();
        }
    });
})