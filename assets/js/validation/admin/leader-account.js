// CREATE LEADER ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#accountLeaderForm')

    const inputName = {
        input1: 'email',
        input2: 'club',
        input3: 'fullname',
        input4: 'schoolId',
        input5: 'campus'
    }

    methodValidation.email(`${inputName['input1']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input1']}Length`, 100, 'email')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER001('họ tên leader'))
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    const $validator = $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            email: {
                required: true,
                email: true,
                emailLength: true
            },
            club: {
                required: true,
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameLength: true
            },
            schoolId: {
                required: true,
                schoolIdEmpty: true,
                schoolIdTwoBytes: true,
                schoolIdLength: true
            },
            campus: {
                required: true
            }
        },
        messages: {
            email: {
                required: messageVietnamese.ER001('email')
            },
            club: {
                required: messageVietnamese.ER001('câu lạc bộ')
            },
            fullname: {
                required: messageVietnamese.ER001('họ tên leader')
            },
            schoolId: {
                required: messageVietnamese.ER001('mã số sinh viên')
            },
            campus: {
                required: messageVietnamese.ER001('cơ sở học')
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
            form.action = '/api/leader-account'
            form.submit()
        }
    })

    $('#kt_modal_leader_cancel #btn-close-new').click(function() {
        $validator.resetForm();
    })
})


// UPDATE LEADER ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_leader_form')

    const inputName = {
        input1: 'email',
        input2: 'club',
        input3: 'fullname',
        input4: 'schoolId',
        input5: 'campus'
    }

    methodValidation.email(`${inputName['input1']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input1']}Length`, 100, 'email')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER001('họ tên leader'))
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    const $validator = $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            email: {
                email: true,
                emailLength: true
            },
            club: {
                required: true,
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameLength: true
            },
            schoolId: {
                required: true,
                schoolIdEmpty: true,
                schoolIdTwoBytes: true,
                schoolIdLength: true
            },
            campus: {
                required: true
            }
        },
        messages: {
            email: {
                required: messageVietnamese.ER001('email')
            },
            club: {
                required: messageVietnamese.ER001('câu lạc bộ')
            },
            fullname: {
                required: messageVietnamese.ER001('họ tên leader')
            },
            schoolId: {
                required: messageVietnamese.ER001('mã số sinh viên')
            },
            campus: {
                required: messageVietnamese.ER001('cơ sở học')
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
            form.action = '/api/leader-account'
            form.submit()
        }
    })

    $('#kt_modal_leader_cancel #btn-close-new').click(function() {
        $validator.resetForm();
    })
})