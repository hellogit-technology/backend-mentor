// CREATE LEADER ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#accountLeaderForm')

    // Reset validation and value
    $('.modal_account_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    const inputName = {
        input1: 'email',
        input2: 'club',
        input3: 'fullname',
        input4: 'schoolId',
        input5: 'campus'
    }

    methodValidation.email(`${inputName['input1']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input1']}Length`, 100, 'email')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER001('họ tên leader'))
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input3']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input4']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            email: {
                required: true,
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/check-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#accountLeaderForm #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            club: {
                required: true,
                remote: {
                    url: '/api/valid-club',
                    type: 'post',
                    data: {
                        club: function() {
                            return $('#accountLeaderForm #club').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                required: true,
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
            schoolId: {
                required: true,
                schoolIdEmpty: true,
                schoolIdTwoBytes: true,
                schoolIdCharacters: true,
                schoolIdLength: true,
                remote: {
                    url: '/api/check-student-id-available',
                    type: 'post',
                    data: {
                        schoolId: function() {
                            return $('#accountLeaderForm #schoolId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                required: true,
                remote: {
                    url: '/api/valid-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#accountLeaderForm #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            }
        },
        messages: {
            email: {
                required: messageVietnamese.ER001('email'),
                remote: messageVietnamese.ER007('Email')
            },
            club: {
                required: messageVietnamese.ER001('câu lạc bộ'),
                remote: messageVietnamese.ER001('câu lạc bộ')
            },
            fullname: {
                required: messageVietnamese.ER001('họ tên leader')
            },
            schoolId: {
                required: messageVietnamese.ER001('mã số sinh viên'),
                remote: messageVietnamese.ER007('Mã số sinh viên')
            },
            campus: {
                required: messageVietnamese.ER001('cơ sở học'),
                remote: messageVietnamese.ER001('cơ sở học')
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
})


// UPDATE LEADER ACCOUNT
$(document).ready(function() {
    const $inputForm = $('#modal_update_leader_form')

    let $accountId 

    // Pass data to modal form
    $(document).on('click', '.update-account-leader', function() {
        $accountId = $(this).data('id');
        const $email = $(this).data('email');
        const $club = $(this).data('club');
        const $fullname = $(this).data('fullname');
        const $schoolId = $(this).data('schoolId')
        const $campus = $(this).data('campus');

        $('#modal_update_leader_form #email').attr('placeholder', $email);
        $('#modal_update_leader_form #fullname').attr('placeholder', $fullname);
        $('#modal_update_leader_form #schoolId').attr('placeholder', $schoolId);
        $('#modal_update_leader_form #campus option').each(function() {
            if($(this).val() === $campus) {
                $(this).attr('selected', 'selected')
            }
        });
        $('#modal_update_leader_form #club option').each(function() {
            if($(this).val() === $club) {
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
        input1: 'email',
        input2: 'club',
        input3: 'fullname',
        input4: 'schoolId',
        input5: 'campus'
    }

    methodValidation.email(`${inputName['input1']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input1']}Length`, 100, 'email')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input3']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input4']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            email: {
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/check-account-email-leader-update',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#modal_update_leader_form #email').val();
                        },
                        id: function() {
                            return $accountId
                        }
                    },
                    dataType: 'json'
                }
            },
            club: {
                remote: {
                    url: '/api/valid-club',
                    type: 'post',
                    data: {
                        club: function() {
                            return $('#modal_update_leader_form #club').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            fullname: {
                fullnameEmpty: true,
                fullnameTwoBytes: true,
                fullnameCharacters: true,
                fullnameLength: true
            },
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
                            return $('#modal_update_leader_form #schoolId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            campus: {
                remote: {
                    url: '/api/valid-campus',
                    type: 'post',
                    data: {
                        campus: function() {
                            return $('#modal_update_leader_form #campus').val();
                        }
                    },
                    dataType: 'json'
                }
            }
        },
        messages: {
            email: {
                remote: messageVietnamese.ER007('Email')
            },
            club: {
                remote: messageVietnamese.ER001('câu lạc bộ')
            },
            schoolId: {
                remote: messageVietnamese.ER007('mã số sinh viên')
            },
            campus: {
                remote: messageVietnamese.ER001('cơ sở học')
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
            form.action = `/api/leader-account/${$accountId}?_method=PATCH`
            form.submit()
        }
    })
})

// DELETE ADMIN ACCOUNT
$(document).ready(function() {
    const $confirmForm = $('#modal_delete_account_leader_form')
    $(document).on('click', '.remove-account-leader', function() {
        const $accountId = $(this).data('id');
        $confirmForm.attr('method', 'post')
        $confirmForm.attr('action', `/api/leader-account/${$accountId}?_method=DELETE`)
    })
})