import {$validateField} from './validate.js'

function $registerForm(form) {
    form.attr('data-form-name','register')
    form.append('<h3>Register form</h3>')
    form.append('<label for="username" class="name">Username:</label><input id="username" autocomplete="username" class="name">')
    $('.name').wrapAll('<div class="row">')
    let $username = $('#username')
    $username.attr('data-parsley-minlength','4')
    $username.attr('data-parsley-maxlength','20')
    $username.attr('data-parsley-username-fill','')
    form.append('<label for="email" type="email" class="email">Email:</label><input id="email" class="email" type="email">')
    $('.email').wrapAll('<div class="row">')
    form.append('<label for="password" class="pass">Password:</label><input id="password" autocomplete="new-password" class="pass" type="password">')
    $('.pass').wrapAll('<div class="row">')
    let $password = $('#password')
    $password.attr('data-parsley-minlength','6')
    $password.attr('data-parsley-maxlength','30')
    form.append('<label for="repeat" class="repeat">Repeat:</label><input id="repeat" autocomplete="new-password" class="repeat" type="password">')
    $('.repeat').wrapAll('<div class="row">')
    let $repeat = $('#repeat')
    $repeat.attr('data-parsley-equalto','#password')
    form.append('<button type="submit" id="register">Register</button>')
    let $input = $('input')
    $input.attr('data-parsley-trigger','focusout')
    $input.attr('data-parsley-required','true')
    $input.wrap('<div class="col-75">')
    $('label').wrap('<div class="col-25">')

    $input.each(function () {
        $validateField($(this))
    })
}

function $saveRegisterInfo() {
    let $passIncode = $('#password').val()
    let $passDecode = String()
    for (let i = 0; i < $passIncode.length; i++) {
        $passDecode += '*'
    }
    return [$('#username').val(), $('#email').val(), $passDecode]
}

function $showRegisterResult(form,data) {
    form.append('<h4>Result</h4>')
    form.append('<table></table>')
    let $table = $('table')
    $table.append('<tr><td>Username</td><td>' + data[0] + '</td></tr>')
    $table.append('<tr><td>Email</td><td>' + data[1] + '</td></tr>')
    $table.append('<tr><td>Password</td><td>' + data[2] + '</td></tr>')
}

export {$registerForm, $saveRegisterInfo, $showRegisterResult}