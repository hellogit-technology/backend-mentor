$(document).ready(function() {
    const $inputForm = $('#accountPDPForm')

    const inputName = {
        input1: 'fullname',
        input2: 'email',
        input3: 'campus',
        input4: 'role'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input1']}Length`, 50, 'họ và tên')
    methodValidation.specialCharacters(`${inputName['input1']}Special`, messageVietnamese.ER0012)
    
    methodValidation.email(`${inputName['input2']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input2']}Length`, 100, 'email')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameSpecial: true,
                fullnameLength: true
            },
            email: {
                required: true,
                email: true,
                emailLength: true
            },
            campus: {
                required: true
            },
            role: {
                required: true
            }
        },
        messages: {
            fullname: {
                required: messageVietnamese.ER001('họ và tên')
            },
            email: {
                required: messageVietnamese.ER001('email')
            },
            campus: {
                required: messageVietnamese.ER001('cở sở làm việc')
            },
            role: {
                required: messageVietnamese.ER001('loại tài khoản')
            }
        },
        highlight: function(element) {
            $(element).addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('has-error');
        },
        errorClass: 'validation-error-message',
        submitHandler: function(form) {
            form.method = 'post'
            form.action = '/api/admin-account'
            form.submit()
        }
    })
})