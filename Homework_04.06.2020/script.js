'use strict';

//Не доделана

let $header = $('#header')
let $form = $('#form')

$(document).ready(function($) {
    $form.parsley()
    $registerForm()
    let $input = $('input')
    $input.each(function () {
        $validateField($(this))
    })
    $('button').click(() => {
        $input.each(function () {
            $formatError($(this))
        })
    })
})

function $registerForm() {
    $header.text('Register form')
    $form.append('<label for="username" class="name">Username:</label><input id="username" class="name">')
    $('.name').wrapAll('<div class="row">')
    let $username = $('#username')
    $username.attr('data-parsley-required','true')
    $username.attr('data-parsley-trigger','focusout')
    $username.attr('data-parsley-minlength','4')
    $username.attr('data-parsley-maxlength','20')
    $username.wrap('<div class="col-75">')
    $('label.name').wrap('<div class="col-25">')
    $form.append('<label for="email" type="email" class="email">Email:</label><input id="email" class="email">')
    $('.email').wrapAll('<div class="row">')
    let $email = $('#email')
    $email.wrap('<div class="col-75">')
    $email.attr('data-parsley-required','true')
    $email.attr('data-parsley-trigger','focusout')
    $('label.email').wrap('<div class="col-25">')
    $form.append('<label for="password" class="pass">Password:</label><input id="password" class="pass">')
    $('.pass').wrapAll('<div class="row">')
    let $password = $('#password')
    $password.wrap('<div class="col-75">')
   $password.attr('data-parsley-required','true')
    $password.attr('data-parsley-trigger','focusout')
    $('label.pass').wrap('<div class="col-25">')
    $form.append('<label for="repeat" class="repeat">Repeat:</label><input id="repeat" class="repeat">')
    $('.repeat').wrapAll('<div class="row">')
    let $repeat = $('#repeat')
    $repeat.wrap('<div class="col-75">')
    $repeat.attr('data-parsley-required','true')
    $repeat.attr('data-parsley-equalto','#pass')
    $repeat.attr('data-parsley-trigger','focusout')
    $('label.repeat').wrap('<div class="col-25">')
    $form.append('<button type="submit">Register</button>')
}

function $formatError(input) {
    let $label = $('label[for="' + input.prop('id') + '"]').text()
    let text = $label.substring(0, $label.length - 1)
    input.attr('data-parsley-required-message', text + ' is required')
    input.attr('data-parsley-minlength-message', text + ' is required')
    $form.width('80%')
    input.removeClass('col-75').addClass('col-50')
    $('button').width('64%')
}

function $validateField(input) {
    input.focus(function () {
        input.parsley()
    })

    input.focusout(function () {
        $formatError(input)
    })
}