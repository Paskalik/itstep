import {$validateField} from './validate.js'

function $userInfo(form) {
    form.attr('data-form-name','info')
    form.append('<h3>User info</h3>')
    form.append('<label for="name" class="name label">Full name:</label><input id="name" class="name input">')
    $('.name').wrapAll('<div class="row">')
    let $fullName = $('#name')
    $fullName.attr('data-parsley-minlength','2')
    $fullName.attr('data-parsley-maxlength','50')
    form.append('<label for="avatar" class="avatar label">Avatar:</label><input id="avatar" class="avatar input" type="file">')
    $('.avatar').wrapAll('<div class="row">')
    form.append('<label for="birth" class="birth label">Birthday:</label>')
    form.append('<input id="birth" class="birth input" type="date">')
    $('.birth').wrapAll('<div class="row">')
    $('#birth').attr('data-parsley-birth-validate','')
    form.append('<label for="gender" class="gender label">Gender:</label>')
    form.append('<input id="male" class="gender gen" name="gender" type="radio" value="male">')
    form.append('<label for="male" class="gender gen">Male</label>')
    form.append('<input id="female" class="gender gen" name="gender" type="radio" value="female">')
    form.append('<label for="female" class="gender gen">Female</label>')
    $('.gender').wrapAll('<div class="row">')
    $('.gen').wrapAll('<div class="col-75">')
    let $gender = $('input.gender')
    $gender.attr('data-parsley-required','true')
    form.append('<label for="subscribe" class="subscribe label">Subscribe:</label>')
    form.append('<input id="subscribe" class="subscribe input" type="checkbox">')
    let $subscribe = $('#subscribe')
    $subscribe.wrapAll('<div class="row">')
    form.append('<button type="submit" id="register">Save</button>')
    let $input = $('.input')
    let $label = $('.label')
    $input.attr('data-parsley-trigger','focusout')
    $input.attr('data-parsley-required','true')
    $subscribe.attr('data-parsley-required','false')
    $input.wrap('<div class="col-75">')
    $label.wrap('<div class="col-25">')

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