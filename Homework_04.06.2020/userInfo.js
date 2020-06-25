import {$validateField} from './validate.js'

function $userInfo(form) {
    form.attr('data-form-name','info')
    form.append(`
        <h3>User info</h3>
        <div id="inputs">
            <label for="name" class="name label">Full name:</label>
            <input id="name" class="name input">
            <div class="error-name"></div>
            <label for="avatar" class="avatar label">Avatar:</label>
            <input id="avatar" class="avatar input" type="file">
            <div class="error-ava"></div>
            <label for="birth" class="birth label">Birthday:</label>
            <input id="birth" class="birth input" type="date">
            <div class="error-birth"></div>
            <div>Gender:</div>
            <div>
            <label class="gender gen">
            <input id="male" class="gender gen" name="gender" type="radio" value="male">
            Male</label>
            <label class="gender gen">
            <input id="female" class="gender gen" name="gender" type="radio" value="female">
            Female</label>
            </div>
            <div class="error-gen"></div>
            <label for="subscribe" class="subscribe label">Subscribe:</label>
            <input id="subscribe" class="subscribe input" type="checkbox">
            <div class="error-sub"></div>
        </div>
        <button type="submit" id="register">Save</button>
    `)
    let $fullName = $('#name')
    $fullName.attr('data-parsley-minlength','2')
    $fullName.attr('data-parsley-maxlength','50')
    $fullName.attr('data-parsley-errors-container', '.error-name')
    $('#avatar').attr('data-parsley-errors-container', '.error-ava')
    let $birth = $('#birth')
    $birth.attr('data-parsley-birth-validate','')
    $birth.attr('data-parsley-errors-container', '.error-birth')
    let $gender = $('input.gender')
    $gender.attr('data-parsley-required','true')
    $gender.attr('data-parsley-errors-container', '.error-gen')
    let $subscribe = $('#subscribe')
    $subscribe.attr('data-parsley-errors-container', '.error-sub')
    let $input = $('.input')
    $input.attr('data-parsley-trigger','focusout')
    $input.attr('data-parsley-required','true')
    $subscribe.attr('data-parsley-required','false')

    $input.each(function () {
        $validateField($(this))
    })
}

function $saveUserInfo() {
    let $gender = $('input[name="radio"]:checked')
    let $subscribe
    if ($('#subscribe').is(':checked')){
        $subscribe = 'Yes';
    } else {
        $subscribe = 'No';
    }
    return [$('#name').val(), $('#avatar').val(), $('#birth').val(), $gender.val(), $subscribe]
}

function $showSaveResult(form,data) {
    form.append('<h4>Result</h4>')
    form.append('<table>')
    let $table = $('table')
    $table.append('<tr><td>Full name</td><td>' + data[0] + '</td></tr>')
    $table.append('<tr><td>Avatar</td><td>' + data[1] + '</td></tr>')
    $table.append('<tr><td>Birthday</td><td>' + data[2] + '</td></tr>')
    $table.append('<tr><td>Gender</td><td>' + data[3] + '</td></tr>')
    $table.append('<tr><td>Subscribe</td><td>' + data[4] + '</td></tr>')
}

export {$userInfo, $saveUserInfo, $showSaveResult}