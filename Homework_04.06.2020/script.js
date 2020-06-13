'use strict';

import {$registerForm, $saveRegisterInfo, $showRegisterResult} from './registerForm.js'
import {$userInfo} from "./userInfo.js";
import {$errorMessage} from "./validate.js";
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

    window.Parsley.addValidator('birthValidate', {
        validateDate: function(value) {
            let reqs = value.split("/")
            if (reqs[2] < 1900) {
                return false;
            }
            else {
                return true;
            }
        },
        messages: {
            en: 'Min birthday is 01/01/1900'
        }
    })

    $registerForm($form)
    let $input = $('input')

    $('#register').click(() => {
        $input.each(function () {
            $errorMessage($(this))
        })
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