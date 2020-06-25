import {$validateField} from './validate.js'

function $registerForm(form) {
    form.attr('data-form-name','register')
    form.append(`
        <h3>Register form</h3>
        <div id="inputs">
            <label for="username" class="name">Username:</label>
            <input id="username" autocomplete="username" class="name">
            <div class="error-name"></div>
            <label for="email" type="email" class="email">Email:</label>
            <input id="email" class="email" type="email">
            <div class="error-email"></div>
            <label for="password" class="pass">Password:</label>
            <input id="password" autocomplete="new-password" class="pass" type="password">
            <div class="error-pass"></div>
            <label for="repeat" class="repeat">Repeat:</label>
            <input id="repeat" autocomplete="new-password" class="repeat" type="password">
            <div class="error-re"></div>
        </div>
        <button type="submit" id="register">Register</button>
    `)
    let $username = $('#username')
    $username.attr('data-parsley-minlength','4')
    $username.attr('data-parsley-maxlength','20')
    $username.attr('data-parsley-username-fill','')
    $username.attr('data-parsley-errors-container', '.error-name')
    $('#email').attr('data-parsley-errors-container', '.error-email')
    let $password = $('#password')
    $password.attr('data-parsley-minlength','6')
    $password.attr('data-parsley-maxlength','30')
    $password.attr('data-parsley-errors-container', '.error-pass')
    let $repeat = $('#repeat')
    $repeat.attr('data-parsley-equalto','#password')
    $repeat.attr('data-parsley-errors-container', '.error-re')
    let $input = $('input')
    $input.attr('data-parsley-trigger','focusout')
    $input.attr('data-parsley-required','true')

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
    let $secureText
    if ((/^\d+$/).test($passIncode) || (/^[a-z]+$/).test($passIncode) || (/^[A-Z]+$/).test($passIncode)) {
        $secureText = '(Very easy)'
    }
    else if ((/^[A-Z0-9]+$/).test($passIncode) || (/^[a-z0-9]+$/).test($passIncode)) {
        $secureText = '(Easy)'
    }
    else if ((/^[A-z0-9]+$/).test($passIncode)) {
        $secureText = '(Normal)'
    }
    else if ((/^[#$-/:-?{-~!"^_`\[\]A-z0-9]+$/).test($passIncode)) {
        $secureText = '(Hard)'
    }
    return [$('#username').val(), $('#email').val(), $passDecode, $secureText]
}

function $showRegisterResult(form,data) {
    form.append('<h4>Result</h4>')
    form.append('<table></table>')
    let $table = $('table')
    $table.append('<tr><td>Username</td><td>' + data[0] + '</td></tr>')
    $table.append('<tr><td>Email</td><td>' + data[1] + '</td></tr>')
    $table.append('<tr><td>Password</td><td>' + data[2] + ' ' + data[3] + '</td></tr>')
}

export {$registerForm, $saveRegisterInfo, $showRegisterResult}