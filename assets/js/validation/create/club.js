
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_club')

    const inputName = {
        input1: 'clubName',
        input2: 'email',
        input3: 'nickname',
        input4: 'fanpage',
        input5: 'founding',
        input6: 'avatar'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('tên câu lạc bộ'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input1']}Length`, 200, 'tên câu lạc bộ')
    
    methodValidation.email(`${inputName['input2']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input2']}Length`, 1000, 'email')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER001('nickname'))
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input3']}Length`, 20, 'nickname')

    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('fanpage'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input4']}Length`, 255, 'fanpage')

    methodValidation.maxStorage(`${inputName['input6']}File`, messageVietnamese.ER0010('5 MB'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            clubName: {
                required: true,
                clubNameEmpty: true,
                clubNameTwoBytes: true,
                clubNameLength: true
            },
            email: {
                required: true,
                emailLength: true
            },
            nickname: {
                nicknameEmpty: true,
                nicknameTwoBytes: true,
                nicknameLength: true
            },
            fanpage: {
                fanpageEmpty: true,
                fanpageTwoBytes: true,
                fanpageLength: true
            },
            avatar: {
                extension: 'png|jpg|jpeg|gif|svg',
                avatarFile: 5
            }
        },
        messages: {
            clubName: {
                required: messageVietnamese.ER001('tên câu lạc bộ')
            },
            email: {
                required: messageVietnamese.ER001('email')
            },
            avatar: {
                extension: messageVietnamese.ER009('.png, .jpg/.jpeg, gif, svg')
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
            form.action = '/api/club'
            form.submit()
        }
    })
})