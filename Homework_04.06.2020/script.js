'use strict';

import {$registerForm, $saveRegisterInfo, $showRegisterResult} from './registerForm.js'
import {$userInfo} from "./userInfo.js";
//Не доделана

let $form = $('#form')

$(document).ready(function($) {
    $form.parsley()
    window.Parsley.addValidator('usernameFill', {
            validateString: function(value) {
                return (value !== 'admin') && (value !== 'user') && (value !== 'test');
            },
            messages: {
                en: 'Username ‘admin’ or ‘user’ or ‘test’ is not allowed'
            }
        });
    $registerForm($form)
    let $input = $('input')

    $('#register').click(() => {
        $input.each(function () {
            $errorMessage($(this))
        })
    })

    $input.each(function () {
        $validateField($(this))
    })

    window.Parsley.on('form:success', function() {
        if (($form.attr('data-form-name') === 'register') && ($('#next').length === 0)) {
            let $register = $('#register')
            let $dataRegister = $saveRegisterInfo()
            $showRegisterResult($form,$dataRegister)
            $input.prop('disabled',true)
            $register.prop('disabled',true)
            $register.css('cursor','default')
            $form.append('<input type="button" id="next" value="Next">')

            $('#next').click(function () {
                $form.empty()
                $userInfo($form)
            })
        }
        /*else if ($form.prop('id') === 'info') {

        }*/
    })
})

function $errorMessage(input) {
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
        $errorMessage(input)
    })
}