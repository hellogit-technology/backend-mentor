$(function() {
    const $inputForm = $("#login-form-input");

    const messageVietnamese = {
        ER001: (param) => `Mục ${param} bắt buộc nhập.`,
        ER002: (param, length, current) => `Mục ${param} tối đa ${length} ký tự. (hiện tại ${current} ký tự)`,
    }

    //? Check valid length
    $.validator.addMethod("maxCharacters", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 10
        }
        return true;
    }, function(length, element){ 
        var currentLength = $(element).val().length
        return messageVietnamese.ER002('Username', 10, currentLength);
    })

    if($inputForm.length) {
        $inputForm.validate({
            onfocusout: function(element) {
                this.element(element); //< inside 'validate()' method, this is like 'valid()'
            },
            rules: {
                campus: {
                    required: true
                },
                username: {
                    required: true,
                    maxCharacters: true
                },
                password: {
                    required: true,
                }
            }, 
            messages: {
                campus: {
                    required: messageVietnamese.ER001('Campus')
                },
                username: {
                    required: messageVietnamese.ER001('Username')
                },
                password: {
                    required: messageVietnamese.ER001('Password'),
                },
            },
            errorElement : 'div',
            errorLabelContainer: '.invalid-feedback',
            submitHandler: function(form) {
                // do other things for a valid form
                form.action = '/login/auth';
                form.method = 'post'
                form.submit();
                $("#login-submit-button").attr("disabled", true);
            }
        })
    }
})