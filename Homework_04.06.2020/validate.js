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

export {$errorMessage, $validateField}