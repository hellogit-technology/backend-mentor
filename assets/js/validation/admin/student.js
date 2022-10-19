$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_students')

    // Reset validation and value
    $('.modal_student_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    const inputName = {
        input1: 'schoolId',
        input2: 'fullname',
        input3: 'email',
        input4: 'campus'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'mã số sinh viên')
    
    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input2']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input2']}Length`, 50, 'họ và tên')

    methodValidation.email(`${inputName['input3']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input3']}Length`, 100, 'email')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            schoolId: {
                required: true,
                schoolIdEmpty: true,
                schoolIdTwoBytes: true,
                schoolIdCharacters: true,
                schoolIdLength: true,
                remote: {
                    url: '/api/check-student-id',
                    type: 'post',
                    data: {
                        schoolId: function() {
                            return $('#schoolId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                schoolIdCharacters: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/check-student-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                requried: true,
                remote: {
                    url: '/api/check-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#campus').val();
                        }
                    },
                    dataType: 'json'
                }
            }
        },
        messages: {
            schoolId: {
                required: messageVietnamese.ER001('mã số sinh viên'),
                remote: messageVietnamese.ER007('Mã số sinh viên')
            },
            fullname: {
                required: messageVietnamese.ER001('họ và tên')
            },
            email: {
                required: messageVietnamese.ER001('email'),
                remote: messageVietnamese.ER007('Email')
            },
            campus: {
                required: messageVietnamese.ER001('cơ sở đang học'),
                remote: messageVietnamese.ER001('cơ sở đang học')
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
            form.action = '/api/student' 
            form.submit()
        }

    })
})