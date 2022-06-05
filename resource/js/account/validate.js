const messageVietnamese = {
    ER001: (param) => `Mục ${param} bắt buộc nhập.`,
    ER002A: (param, length, current) => `Mục ${param} tối đa ${length} ký tự. (hiện tại ${current} ký tự.)`,
    ER002B: (param, length, current) => `Mục ${param} tối thiểu ${length} ký tự. (hiện tại ${current} ký tự.)`,
    ER003: `Email nhập không hợp lệ.`,
    ER004: `Không nhập ký tự icon, ký tự 2 byte.`,
    ER005: `Không được nhập dấu cách.`,
    ER006: `Xác nhận mật khẩu không trùng khớp.`
}

$(function() {
    const $inputForm = $("#create-account-mentor-form");

    //? Check 2 byte 
     $.validator.addMethod("check2Bytes", function(value, element) {
        return this.optional( element ) || !/[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(value);
    }, messageVietnamese.ER004)

    //? Check no space in username
    $.validator.addMethod("noSpaceName", function(value, element) { 
        return value == '' || value.trim().length != 0;  
    }, messageVietnamese.ER001('tên tài khoản'));

    //? Check no space in password
    $.validator.addMethod("noSpacePassword", function(value, element) { 
        return value == '' || value.trim().length != 0;  
    }, messageVietnamese.ER005);

    //? Check valid email
    $.validator.addMethod("customEmail", function(value, element) { 
        var regex =
        /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return this.optional( element ) || regex.test( value ); 
    }, messageVietnamese.ER003);

    //? Check max length username input 
    $.validator.addMethod("nameMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 20
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('tên tài khoản', 20, currentlyNum);
    })  

    //? Check max length password input 
    $.validator.addMethod("passMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 50
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('mật khẩu', 50, currentlyNum);
    }) 

    //? Check max length password input 
    $.validator.addMethod("emailMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 100
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('email', 100, currentlyNum);
    })

    //? Check min length password input 
    $.validator.addMethod("passMinLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength >= 8
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('mật khẩu', 8, currentlyNum);
    }) 


    if($inputForm.length) {
        $inputForm.validate({
            onfocusout: function(element) {
                this.element(element); //< inside 'validate()' method, this is like 'valid()'
            },
            rules: {
                username: {
                    required: true,
                    noSpaceName: true,
                    nameMaxLength: true
                },
                password: {
                    required: true,
                    noSpacePassword: true,
                    passMinLength: true,
                    passMaxLength: true
                },
                cPassword: {
                    required: true,
                    equalTo: "#inputPasswordMentor"
                },
                email: {
                    required: true,
                    customEmail: true,
                    emailMaxLength: true
                },
                campus: {
                    required: true,
                }
            }, 
            messages: {
                username: {
                    required: messageVietnamese.ER001('tên tài khoản')
                },
                password: {
                    required: messageVietnamese.ER001('mật khẩu'),
                },
                cPassword: {
                    required: messageVietnamese.ER001('xác nhận mật khẩu'),
                    equalTo: messageVietnamese.ER006
                },
                email: {
                    required: messageVietnamese.ER001('email'),
                },
                campus: {
                    required: messageVietnamese.ER001('cơ sở'),
                }
            },
            submitHandler: function(form) {
                // do other things for a valid form
                form.action = '/account/action';
                form.method = 'post'
                form.submit();
                $("#btn-create-account-mentor").attr("disabled", true);
            }
        })
    }
})

$(function() {
    const $inputForm = $("#create-account-leader-form");

    //? Check 2 byte 
    $.validator.addMethod("check2Bytes", function(value, element) {
        return this.optional( element ) || !/[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(value);
    }, messageVietnamese.ER004)

    //? Check no space in username
    $.validator.addMethod("noSpaceName", function(value, element) { 
        return value == '' || value.trim().length != 0;  
    }, messageVietnamese.ER001('tên tài khoản'));

    //? Check no space in password
    $.validator.addMethod("noSpacePassword", function(value, element) { 
        return value == '' || value.trim().length != 0;  
    }, messageVietnamese.ER005);

    //? Check valid email
    $.validator.addMethod("customEmail", function(value, element) { 
        var regex =
        /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return this.optional( element ) || regex.test( value ); 
    }, messageVietnamese.ER003);

    //? Check max length username input 
    $.validator.addMethod("nameMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 20
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('tên tài khoản', 20, currentlyNum);
    })  

    //? Check max length password input 
    $.validator.addMethod("passMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 50
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('mật khẩu', 50, currentlyNum);
    }) 

    //? Check max length password input 
    $.validator.addMethod("emailMaxLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength <= 100
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('email', 100, currentlyNum);
    })

    //? Check min length password input 
    $.validator.addMethod("passMinLength", function(value, element) {
        var valueLength = value.length;
        if(valueLength) {
            return valueLength >= 8
        }
        return true;
    }, function(length, element){ 
        var currentlyNum = $(element).val().length
        return messageVietnamese.ER002A('mật khẩu', 8, currentlyNum);
    }) 
    
    if($inputForm.length) {
        $inputForm.validate({
            onfocusout: function(element) {
                this.element(element); //< inside 'validate()' method, this is like 'valid()'
            },
            rules: {
                username: {
                    required: true,
                    noSpaceName: true,
                    nameMaxLength: true
                },
                password: {
                    required: true,
                    noSpacePassword: true,
                    passMinLength: true,
                    passMaxLength: true
                },
                cPassword: {
                    required: true,
                    equalTo: "#inputPasswordLeader"
                },
                email: {
                    required: true,
                    customEmail: true,
                    emailMaxLength: true
                },
                campus: {
                    required: true,
                },
                club: {
                    required: true
                }
            }, 
            messages: {
                username: {
                    required: messageVietnamese.ER001('tên tài khoản')
                },
                password: {
                    required: messageVietnamese.ER001('mật khẩu'),
                },
                cPassword: {
                    required: messageVietnamese.ER001('xác nhận mật khẩu'),
                    equalTo: messageVietnamese.ER006
                },
                email: {
                    required: messageVietnamese.ER001('email'),
                },
                campus: {
                    required: messageVietnamese.ER001('cơ sở'),
                },
                club: {
                    required: messageVietnamese.ER001('câu lạc bộ')
                }
            },
            submitHandler: function(form) {
                // do other things for a valid form
                form.action = '/account/auth';
                form.method = 'post'
                form.submit();
                $("#login-submit-button").attr("disabled", true);
            }
        })
    }
})