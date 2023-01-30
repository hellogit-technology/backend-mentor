// CREATE STUDENT
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
                            return $('#kt_modal_evaluation_form_students #schoolId').val();
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
                            return $('#kt_modal_evaluation_form_students #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                required: true,
                remote: {
                    url: '/api/check-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#kt_modal_evaluation_form_students #campus').val();
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


// UPDATE STUDENT
$(document).ready(function() {
    const $inputForm = $('#modal_update_student_form')

    let $studentId 

    // Pass data to modal form
    $(document).on('click', '.update-student', function() {
        $studentId = $(this).data('id');
        const $schoolId = $(this).data('schoolid')
        const $fullname = $(this).data('fullname');
        const $email = $(this).data('email');
        const $campus = $(this).data('campus');

        $('#modal_update_student_form #schoolId').attr('placeholder', $schoolId);
        $('#modal_update_student_form #fullname').attr('placeholder', $fullname);
        $('#modal_update_student_form #email').attr('placeholder', $email);
        $("#modal_update_student_form #campus option").each(function() {
            if($(this).val() === $campus) {
                $(this).attr('selected', 'selected')
            }
        });

    })

    // Reset validation and value
    $('.modal_student_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
    })

    const inputName = {
        input1: 'schoolId',
        input2: 'fullname',
        input3: 'email',
        input4: 'campus'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'mã số sinh viên')
    
    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER005)
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
                schoolIdEmpty: true,
                schoolIdTwoBytes: true,
                schoolIdCharacters: true,
                schoolIdLength: true,
                remote: {
                    url: '/api/check-student-id',
                    type: 'post',
                    data: {
                        schoolId: function() {
                            return $('#modal_update_student_form #schoolId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                schoolIdCharacters: true,
                fullnameLength: true
            },
            email: {
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/check-student-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#modal_update_student_form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                remote: {
                    url: '/api/check-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#modal_update_student_form #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            }
        },
        messages: {
            schoolId: {
                remote: messageVietnamese.ER007('Mã số sinh viên')
            },
            email: {
                remote: messageVietnamese.ER007('Email')
            },
            campus: {
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
            form.action = `/api/student/${$studentId}?_method=PATCH`
            form.submit()
        }
    })
})


// DELETE STUDENT
$(document).ready(function() {
    const $confirmForm = $('#modal_delete_student_form')
    $(document).on('click', '.remove-student', function() {
        const $studentId = $(this).data('id');
        $confirmForm.attr('method', 'post')
        $confirmForm.attr('action', `/api/student/${$studentId}?_method=DELETE`)
    })
})