'use strict';

//Не доделана

let $header = $('#header')
let $form = $('#form')

$(document).ready(function($) {
    $form.parsley();
    $registerForm()
    $form.parsley().on('field:validated', function() {
        let $ok = $('.parsley-error').length === 0;
        $('.bs-callout-info').toggleClass('hidden', !$ok);
        $('.bs-callout-warning').toggleClass('hidden', $ok);
    })
        .on('form:submit', function() {
            return false; // Don't submit form for this demo
        });
    $('button').click(() => {
        $checkError($('input'))
    })
})

function $registerForm() {
    $header.text('Register form')
    $form.append('<label for="username" class="name">Username:</label><input id="username" class="name">')
    $('.name').wrapAll('<div class="row">')
    let $username = $('#username')
    $username.attr('data-parsley-required','true')
    //$username.attr('data-parsley-errors-container','.error')
    $username.wrap('<div class="col-75">')
    $('label.name').wrap('<div class="col-25">')
    $form.append('<label for="email" type="email" class="email">Email:</label><input id="email" class="email">')
    $('.email').wrapAll('<div class="row">')
    let $email = $('#email')
    $email.wrap('<div class="col-75">')
    $email.attr('data-parsley-required','true')
    $('label.email').wrap('<div class="col-25">')
    $form.append('<label for="password" class="pass">Password:</label><input id="password" class="pass">')
    $('.pass').wrapAll('<div class="row">')
    let $password = $('#password')
    $password.wrap('<div class="col-75">')
    $password.attr('data-parsley-required','true')
    $('label.pass').wrap('<div class="col-25">')
    $form.append('<label for="repeat" class="repeat">Repeat:</label><input id="repeat" class="repeat">')
    $('.repeat').wrapAll('<div class="row">')
    let $repeat = $('#repeat')
    $repeat.wrap('<div class="col-75">')
    $repeat.attr('data-parsley-required','true')
    $('label.repeat').wrap('<div class="col-25">')
    $form.append('<button type="submit">Register</button>')
}

function $checkError(input) {
    if (input.siblings('.parsley-errors-list')) {
        $form.width('70%')
        input.toggleClass('col-75 col-50')

    }
}