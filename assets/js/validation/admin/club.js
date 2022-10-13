
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_club')

    const inputName = {
        input1: 'clubId',
        input2: 'clubName',
        input3: 'email',
        input4: 'nickname',
        input5: 'fanpage',
        input6: 'founding',
        input7: 'avatar'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('ID câu lạc bộ'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'ID câu lạc bộ')

    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('tên câu lạc bộ'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input2']}Length`, 200, 'tên câu lạc bộ')
    
    methodValidation.email(`${inputName['input3']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input3']}Length`, 1000, 'email')

    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('nickname'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input4']}Length`, 20, 'nickname')

    methodValidation.empty(`${inputName['input5']}Empty`, messageVietnamese.ER001('fanpage'))
    methodValidation.twoBytes(`${inputName['input5']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input5']}Length`, 255, 'fanpage')

    methodValidation.empty(`${inputName['input6']}Empty`, messageVietnamese.ER001('ngày thành lập'))
    methodValidation.isDate(`${inputName['input6']}`, messageVietnamese.ER001('ngày thành lập'))

    methodValidation.maxStorage(`${inputName['input7']}File`, messageVietnamese.ER0010('5 MB'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            clubId: {
                required: true,
                clubIdEmpty: true,
                clubId: true,
                remote: {
                    url: "/check-email",
                    type: "post",
                    data: {
                        clubId: function() {
                            return $("#clubId").val();
                        }
                    },
                    dataType: 'json'
                }
            },
            clubName: {
                required: true,
                clubNameEmpty: true,
                clubNameTwoBytes: true,
                clubNameLength: true
            },
            email: {
                required: true,
                email: true,
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