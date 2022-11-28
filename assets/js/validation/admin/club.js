// CREATE CLUB
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_club')

    // Preview photo
    $('#kt_modal_evaluation_form_club #avatar').change(function() {
        console.log('run')
        const file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                $('#kt_modal_evaluation_form_club #preview-photo')
                    .attr('src', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    })

    // Reset validation and value
    $('.modal_club_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

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
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'ID câu lạc bộ')

    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('tên câu lạc bộ'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input2']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input2']}Length`, 300, 'tên câu lạc bộ')
    
    methodValidation.email(`${inputName['input3']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input3']}Length`, 100, 'email')

    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('nickname'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input4']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input4']}Length`, 50, 'nickname')

    methodValidation.maxLength(`${inputName['input5']}Length`, 300, 'fanpage')

    methodValidation.isDate(`${inputName['input6']}Format`, messageVietnamese.ER001('ngày thành lập'))

    methodValidation.maxStorage(`${inputName['input7']}File`, messageVietnamese.ER0010('5 MB'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            clubId: {
                required: true,
                clubIdEmpty: true,
                clubIdTwoBytes: true,
                clubIdCharacters: true,
                clubIdLength: true,
                remote: {
                    url: '/api/check-club-id',
                    type: 'post',
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
                clubNameCharacters: true,
                clubNameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/check-club-id',
                    type: 'post',
                    data: {
                        clubId: function() {
                            return $("#clubId").val();
                        }
                    },
                    dataType: 'json'
                }
            },
            nickname: {
                required: true,
                nicknameEmpty: true,
                nicknameTwoBytes: true,
                nicknameCharacters: true,
                nicknameLength: true,
                remote: {
                    url: '/api/check-club-nickname',
                    type: 'post',
                    data: {
                        nickname: function() {
                            return $('#nickname').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fanpage: {
                required: true,
                url: true,
                fanpageLength: true
            },
            founding: {
                foundingFormat: true
            },
            avatar: {
                required: true,
                extension: 'png|jpg|jpeg|gif|svg',
                avatarFile: 5
            }
        },
        messages: {
            clubId: {
                required: messageVietnamese.ER001('ID câu lạc bộ'),
                remote: messageVietnamese.ER007('ID câu lạc bộ')
            },
            clubName: {
                required: messageVietnamese.ER001('tên câu lạc bộ')
            },
            email: {
                required: messageVietnamese.ER001('email'),
                remote: messageVietnamese.ER007('Email')
            },
            nickname: {
                required: messageVietnamese.ER001('nickname'),
                remote: messageVietnamese.ER007('Nickname')
            },
            fanpage: {
                required: messageVietnamese.ER001('fanpage'),
                url: messageVietnamese.ER0013('fanpage')
            },
            avatar: {
                required: messageVietnamese.ER001('avatar'),
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