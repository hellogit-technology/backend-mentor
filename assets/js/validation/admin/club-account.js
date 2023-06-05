'use strict'

// CREATE ClUB ACCOUNT
$(function() {
    const $inputForm = $('#club-new-account-form')

    // Reset validation and value
    $(document).on('click', '.modal-account-cancel', function() {
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

    methodValidation.maxLength(`${inputName['input2']}Length`, 24, 'club')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER001('họ tên leader'))
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input3']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER001('mã số sinh viên'))
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input4']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    methodValidation.maxLength(`${inputName['input5']}Length`, 24, 'campus')

    const debounceCreate = _.debounce(function(form) {
        $.ajax({
            url: '/api/admin/club-account',
            method: 'POST',
            data: $(form).serialize(), 
            success: function(response) {
                $(form)[0].reset();
                successToast(messageVietnamese.RES004B('tài khoản club'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES004A('tài khoản club'))
            }
        });
    }, 1500)

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
                    url: '/api/validation/exist-account-email',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#club-new-account-form #email').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            club: {
                required: true,
                clubLength: true,
                remote: {
                    url: '/api/validation/valid-club',
                    type: 'post',
                    data: {
                        club: function() {
                            return $('#club-new-account-form #club').val();
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
                    url: '/api/validation/exist-student-id',
                    type: 'post',
                    data: {
                        schoolId: function() {
                            return $('#club-new-account-form #schoolId').val();
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
                            return $('#club-new-account-form #campus').val();
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
            debounceCreate(form)
        }
    })
})


// UPDATE LEADER ACCOUNT
$(function() {
    const $inputForm = $('#club-update-account-form')

    let $accountId 

    // Pass data to modal form
    $(document).on('click', '.club-update-account', function() {
        $accountId = $(this).data('id');
        const $email = $(this).data('email');
        const $club = $(this).data('club');
        const $fullname = $(this).data('fullname');
        const $schoolId = $(this).data('schoolId')
        const $campus = $(this).data('campus');

        $('#club-update-account-form #email').attr('placeholder', $email);
        $('#club-update-account-form #fullname').attr('placeholder', $fullname);
        $('#club-update-account-form #schoolId').attr('placeholder', $schoolId);
        $('#club-update-account-form #campus option').each(function() {
            if($(this).val() === $campus) {
                $(this).attr('selected', 'selected')
            }
        });
        $('#club-update-account-form #club option').each(function() {
            if($(this).val() === $club) {
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
        input1: 'email',
        input2: 'club',
        input3: 'fullname',
        input4: 'schoolId',
        input5: 'campus'
    }

    methodValidation.email(`${inputName['input1']}Format`, messageVietnamese.ER003)
    methodValidation.maxLength(`${inputName['input1']}Length`, 100, 'email')

    methodValidation.maxLength(`${inputName['input2']}Length`, 24, 'club')

    methodValidation.empty(`${inputName['input3']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input3']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input3']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input3']}Length`, 50, 'họ tên leader')
    
    methodValidation.empty(`${inputName['input4']}Empty`, messageVietnamese.ER005)
    methodValidation.twoBytes(`${inputName['input4']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input4']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input4']}Length`, 30, 'mã số sinh viên')

    methodValidation.maxLength(`${inputName['input5']}Length`, 24, 'campus')

    const debounceUpdate = _.debounce(function(form) {
        $.ajax({
            url: `/api/admin/club-account/${$accountId}`,
            method: 'PATCH',
            data: $(form).serialize(), 
            success: function(response) {
                $(form)[0].reset();
                successToast(messageVietnamese.RES002B('tài khoản club'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES002A('tài khoản club'))
            }
        });
    }, 1500)

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            email: {
                emailFormat: true,
                emailLength: true,
                remote: {
                    url: '/api/validation/update-email-club',
                    type: 'post',
                    data: {
                        email: function() {
                            return $('#club-update-account-form #email').val();
                        },
                        id: function() {
                            return $accountId
                        }
                    },
                    dataType: 'json'
                }
            },
            club: {
                clubLength: true,
                remote: {
                    url: '/api/validation/valid-club',
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
                    url: '/api/validation/update-student-id',
                    type: 'post',
                    data: {
                        schoolId: function() {
                            return $('#club-update-account-form #schoolId').val();
                        },
                        id: function() {
                            return  $accountId
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
                            return $('#club-update-account-form #campus').val();
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
            debounceUpdate(form)
        }
    })
})


// DELETE ADMIN ACCOUNT
$(function() {
    let $accountId
    $(document).on('click', '.club-delete-account', function() {
        $accountId = $(this).data('id');
    })
    $(document).on('click', '#club-delete-account-form #confirm-delete-account', _.debounce(function() {
        $.ajax({
            url: `/api/admin/club-account/${$accountId}`,
            method: 'DELETE',
            success: function(response) {
                successToast(messageVietnamese.RES003B('tài khoản club'))
            },
            error: function(xhr, status, error) {
                failedToast(messageVietnamese.RES003A('tài khoản club'))
            }
        });
    }, 1500))
})


// SEARCH ADMIN ACCOUNT
$(function() {
    const searchFunction = _.debounce(function() {
        const searchValue = $('#club-search-account #search').val()
        $.ajax({
            url: `/api/admin/club-account?search=${encodeURIComponent(searchValue)}`,
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
        const searchValue = $('#club-search-account #search').val()
        if(searchValue.length <= limitLength) {
            pendingToast('Đang tìm kiếm...')
            searchFunction()
        } else {
            warningToast(`Giới hạn tìm kiếm ${limitLength} ký tự. (${searchValue.length} ký tự)`)
        }
    }

    $('#club-search-account #search').on('keydown', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            event.preventDefault();
        }
    })

    $('#club-search-account #search').on('keyup', function() {
        skeletonSearchShow()
        checkSearch(20)
    });
})
