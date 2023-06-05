'use strict'

// CREATE ADMIN ACCOUNT
$(function() {
    const $inputForm = $('#admin-new-account-form')

    // Reset validation and value
    $(document).on('click', '.modal-account-cancel', function() {
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

    methodValidation.maxLength(`${inputName['input3']}Length`, 24, 'campus')

    // Check Role
    $.validator.addMethod('checkRole', function(value, element) { 
        if(value !== '0' && value !== '1') {
            return false
        }
        return true
    }, messageVietnamese.ER001('loại tài khoản'));

    const debounceCreate = _.debounce(function(form) {
        $.ajax({
            url: '/api/admin/admin-account',
            method: 'POST',
            data: $(form).serialize(), 
            success: function(response) {
                $(form)[0].reset();
                successToast(messageVietnamese.RES004B('tài khoản admin'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES004A('tài khoản admin'))
            }
        });
    }, 1500)

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
                    url: '/api/validation/exist-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#admin-new-account-form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                required: true,
                campusLength: true,
                remote: {
                    url: '/api/validation/valid-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#admin-new-account-form #campus').val();
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
            debounceCreate(form)
        }
    })
})


// UPDATE ADMIN ACCOUNT
$(function() {
    const $inputForm = $('#admin-update-account-form')

    let $accountId 

    // Pass data to modal form
    $(document).on('click', '.admin-update-account', function() {
        $accountId = $(this).data('id');
        const $fullname = $(this).data('fullname');
        const $email = $(this).data('email');
        const $campus = $(this).data('campus');

        $('#admin-update-account-form #fullname').attr('placeholder', $fullname);
        $('#admin-update-account-form #email').attr('placeholder', $email);
        $('#admin-update-account-form #campus option').each(function() {
            if($(this).val() === $campus) {
                $(this).attr('selected', 'selected')
            }
        });

    })

    // Reset validation and value
    $(document).on('click', '.modal-account-cancel', function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
    })

    const inputName = {
        input1: 'fullname',
        input2: 'email',
        input3: 'campus',
        input4: 'role'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 50, 'họ và tên')
    
    methodValidation.email(`${inputName['input2']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input2']}Length`, 100, 'email')

    methodValidation.maxLength(`${inputName['input3']}Length`, 24, 'campus')

    // Check Role
    $.validator.addMethod('checkRole', function(value, element) { 
        if(value !== '0' && value !== '1') {
            return false
        }
        return true
    }, messageVietnamese.ER001('loại tài khoản'));

    const debounceUpdate = _.debounce(function(form) {
        $.ajax({
            url: `/api/admin/admin-account/${$accountId}`,
            method: 'PATCH',
            data: $(form).serialize(), 
            success: function(response) {
                $(form)[0].reset();
                successToast(messageVietnamese.RES002B('tài khoản admin'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES002A('tài khoản admin'))
            }
        });
    }, 1500)
    

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
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/validation/update-email-admin',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#admin-update-account-form #email').val();
                        },
                        id: function() {
                            return $accountId
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                campusLength: true,
                remote: {
                    url: '/api/validation/valid-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#admin-update-account-form #campus').val();
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
            debounceUpdate(form)
        }
    })
    
})


// DELETE ADMIN ACCOUNT
$(function() {
    let $accountId
    $(document).on('click', '.admin-delete-account', function() {
        $accountId = $(this).data('id');
    })

    $(document).on('click', '#admin-delete-account-form #aconfirm-delete-account', _.debounce(function() {
        $.ajax({
            url: `/api/admin/admin-account/${$accountId}`,
            method: 'DELETE',
            success: function(response) {
                successToast(messageVietnamese.RES003B('tài khoản admin'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES003A('tài khoản admin'))
            }
        });
    }, 1500))
})


// SEARCH ADMIN ACCOUNT
$(function() {
    const searchFunction = _.debounce(function() {
        const searchValue = $('#admin-search-account #search').val()
        $.ajax({
            url: `/api/admin/admin-account?search=${encodeURIComponent(searchValue)}`,
            method: 'GET',
            success: function(response) {
                $('#payload').html(response)
                closeToast()
                skeletonSearchHide()
            },
            error: function(xhr, status, error) {
                skeletonSearchHide()
            }
        });
    }, 2500)

    const checkSearch = function(limitLength){
        const searchValue = $('#admin-search-account #search').val()
        if(searchValue.length <= limitLength) {
            pendingToast('Đang tìm kiếm...')
            searchFunction()
        } else {
            warningToast(`Giới hạn tìm kiếm ${limitLength} ký tự. (${searchValue.length} ký tự)`)
        }
    }

    $('#admin-search-account #search').on('keydown', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            event.preventDefault();
        }
    })

    $('#admin-search-account #search').on('keyup', function() {
        skeletonSearchShow()
        checkSearch(20)
    })
})