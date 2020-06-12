'use strict';

//Не доделана

let $header = $('#header')
let $form = $('#form')
let $data

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
        if ($('.parsley-error').length === 0) {
            $data = $saveInfo()
            $showRegisterResult()
        }
    })
})

function $registerForm() {
    $header.text('Register form')
    $form.append('<label for="username" class="name">Username:</label><input id="username" class="name">')
    $('.name').wrapAll('<div class="row">')
    let $username = $('#username')
    $username.attr('data-parsley-minlength','4')
    $username.attr('data-parsley-maxlength','20')
    $form.append('<label for="email" type="email" class="email">Email:</label><input id="email" class="email" type="email">')
    $('.email').wrapAll('<div class="row">')
    $form.append('<label for="password" class="pass">Password:</label><input id="password" class="pass" type="password">')
    $('.pass').wrapAll('<div class="row">')
    let $password = $('#password')
    $password.attr('data-parsley-minlength','6')
    $password.attr('data-parsley-maxlength','30')
    $form.append('<label for="repeat" class="repeat">Repeat:</label><input id="repeat" class="repeat" type="password">')
    $('.repeat').wrapAll('<div class="row">')
    let $repeat = $('#repeat')
    $repeat.attr('data-parsley-equalto','#password')
    $form.append('<button type="submit">Register</button>')
    let $input = $('input')
    $input.attr('data-parsley-trigger','focusout')
    $input.attr('data-parsley-required','true')
    $input.wrap('<div class="col-75">')
    $('label').wrap('<div class="col-25">')
}

function $saveInfo() {
    return [$('#username').val(), $('#email').val(), $('#password').val()]
}

function $showRegisterResult() {
    $form.append('<h4>Result</h4>')
    let $table = $form.append('<table>')
    $table.append('<tr><td>Username</td><td>' + $data[0] + '</td></tr>')
    $table.append('<tr><td>Email</td><td>' + $data[1] + '</td></tr>')
    $table.append('<tr><td>Password</td><td>' + $data[2] + '</td></tr>')
}

function $formatError(input) {
    let $label = $('label[for="' + input.prop('id') + '"]').text()
    let $text = $label.substring(0, $label.length - 1)
    let $min = input.attr('data-parsley-minlength')
    let $max = input.attr('data-parsley-maxlength')
    input.attr('data-parsley-required-message', $text + ' is required')
    input.attr('data-parsley-minlength-message', 'Min length is ' + $min + ' characters')
    input.attr('data-parsley-maxlength-message', 'Max length is ' + $max + ' characters')
    input.attr('data-parsley-type-message', 'Enter a valid email address')
    input.attr('data-parsley-equalto-message', 'The password must match')
}

function $validateField(input) {
    input.focus(function () {
        input.parsley()
    })

    input.focusout(function () {
        $formatError(input)
    })
}