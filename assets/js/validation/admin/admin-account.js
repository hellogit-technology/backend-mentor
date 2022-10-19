// CREATE ADMIN ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#accountPDPForm')

    // Reset validation and value
    $('.modal_account_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    const inputName = {
        input1: 'fullname',
        input2: 'email',
        input3: 'campus',
        input4: 'role'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'họ và tên')
    
    methodValidation.email(`${inputName['input2']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input2']}Length`, 100, 'email')

    // Check Role
    $.validator.addMethod('checkRole', function(value, element) { 
        if(value !== '0' && value !== '1') {
            return false
        }
        return true
    }, messageVietnamese.ER001('loại tài khoản'));

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                required: true,
                emailFormat: true,
                emailLength: true ,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#accountPDPForm #email').val();
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
                            return $('#accountPDPForm #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            role: {
                required: true,
                checkRole: true 
            }
        },
        messages: {
            fullname: {
                required: messageVietnamese.ER001('họ và tên')
            },
            email: {
                required: messageVietnamese.ER001('email'),
                remote: messageVietnamese.ER007('Email')
            },
            campus: {
                required: messageVietnamese.ER001('cở sở làm việc'),
                remote: messageVietnamese.ER001('cở sở làm việc')
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


// UPDATE ADMIN ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#modal_update_pdp_form')

    let $accountId 

    // Pass data to modal form
    $(document).on('click', '.update-account-pdp', function() {
        $accountId = $(this).data('id');
        const $fullname = $(this).data('fullname');
        const $email = $(this).data('email');
        const $campus = $(this).data('campus');

        $('#modal_update_pdp_form #fullname').attr('placeholder', $fullname);
        $('#modal_update_pdp_form #email').attr('placeholder', $email);
        $("#modal_update_pdp_form #campus option").each(function() {
            if($(this).val() === $campus) {
                $(this).attr('selected', 'selected')
            }
        });

    })

    // Reset validation and value
    $('.modal_account_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
    })

    const inputName = {
        input1: 'fullname',
        input2: 'email',
        input3: 'campus',
        input4: 'role'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 50, 'họ và tên')
    
    methodValidation.email(`${inputName['input2']}`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input2']}Length`, 100, 'email')

    // Check Role
    $.validator.addMethod('checkRole', function(value, element) { 
        if(value !== '0' && value !== '1') {
            return false
        }
        return true
    }, messageVietnamese.ER001('loại tài khoản'));

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            fullname: {
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            email: {
                email: true,
                emailLength: true,
                remote: {
                    url: '/api/check-account-email-pdp-update',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#modal_update_pdp_form #email').val();
                        },
                        id: function() {
                            return $accountId
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
                            return $('#modal_update_pdp_form #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            role: {
                checkRole: true
            }
        },
        messages: {
            email: {
                remote: messageVietnamese.ER007('Email')
            },
            campus: {
                remote: messageVietnamese.ER001('cở sở làm việc')
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
            form.action = `/api/admin-account/${$accountId}?_method=PATCH`
            form.submit()
        }
    })
})


// DELETE ADMIN ACCOUNT
$(document).ready(function() {
    let $accountId
    const $confirmForm = $('#modal_delete_account_pdp_form')
    $(document).on('click', '.remove-account-pdp', function() {
        $accountId = $(this).data('id');
    })
    $confirmForm.attr('method', 'post')
    $confirmForm.attr('action', `/api/admin-account/${$accountId}?_method=DELETE`)
})