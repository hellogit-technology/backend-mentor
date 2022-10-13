$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_students')

    const inputName = {
        input1: 'schoolId',
        input2: 'fullname',
        input3: 'email',
        input4: 'campus'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'mã số sinh viên')
    
    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input2']}Length`, 50, 'họ và tên')

    methodValidation.email(`${inputName['input3']}`, messageVietnamese.ER003)
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
                schoolIdLength: true
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailLength: true
            },
            campus: {
                requried: true
            }
        },
        messages: {
            schoolId: {
                required: messageVietnamese.ER001('mã số sinh viên')
            },
            fullname: {
                required: messageVietnamese.ER001('họ và tên')
            },
            email: {
                required: messageVietnamese.ER001('email')
            },
            campus: {
                required: messageVietnamese.ER001('cơ sở đang học')
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