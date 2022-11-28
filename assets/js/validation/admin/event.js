// CREATE EVENT
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_event')

    // Add new club
    let i = 1
    $('#add-input-club-event').click(function() {
        let $id = `club-event-${++i}`
        let $clubInput = $('#club-event-1').clone().attr('id', $id).removeClass('has-error')
        let $parent = $('<div class="row" style="margin-top: 10px;"></div')
        let $icon = $('<div class="col-md-1 fv-row"><div class="btn btn-icon btn-active-light-primary remove-club"><i style="font-size: larger" class="fa-solid fa-square-minus"></i></div</div>')
        let $baseInput = $('<div class="col-md-11 fv-row"></div>')
        $baseInput.append($clubInput)
        $parent.append($baseInput)
        $parent.append($icon)
        $('#main-club-input').after($parent)
        $(`#${$id}`).rules('add',  { 
            remote: {
                url: '/api/check-club',
                type: 'post',
                data: {
                    club: function() {
                        return $(`#${$id}`).val();
                    }
                },
                dataType: 'json'
            },
            messages: {
                remote: messageVietnamese.ER007('Đồng tổ chức')
            }
         })

        // Remove club
        $('.remove-club').click(function() {
            $(`#${$id}`).rules( 'remove');
            this.closest('div.row').remove()
        })
    })

    // Reset validation and value
    $('.modal_event_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    const inputName = {
        input1: 'eventId',
        input2: 'eventName',
        input3: 'poster',
        input4: 'date',
        input5: 'club'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('ID sự kiện'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'ID sự kiện')

    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('tên sự kiện'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input2']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input2']}Length`, 300, 'tên sự kiện')

    methodValidation.maxStorage(`${inputName['input3']}File`, messageVietnamese.ER0010('10 MB'))

    methodValidation.isDate(`${inputName['input4']}Format`, messageVietnamese.ER001('ngày diễn ra'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            eventId: {
                required: true,
                eventIdEmpty: true,
                eventIdTwoBytes: true,
                eventIdCharacters: true,
                eventIdLength: true,
                remote: {
                    url: '/api/check-event-id',
                    type: 'post',
                    data: {
                        eventId: function() {
                            return $('#eventId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            eventName: {
                required: true,
                eventNameEmpty: true,
                eventNameTwoBytes: true,
                eventNameCharacters: true,
                eventNameLength: true
            },
            date: {
                required: true,
                dateFormat: true
            },
            'club[]': {
                remote: {
                    url: '/api/check-club',
                    type: 'post',
                    data: {
                        club: function() {
                            return $('#club-event-1').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            poster: {
                required: true,
                extension: 'png|jpg|jpeg|gif|svg',
                posterFile: 10
            }
        },
        messages: {
            eventId: {
                required: messageVietnamese.ER001('ID sự kiện'),
                remote: messageVietnamese.ER007('ID sự kiện')
            },
            eventName: {
                required: messageVietnamese.ER001('tên sự kiện')
            },
            date: {
                required: messageVietnamese.ER001('ngày diễn ra')
            },
            'club[]': {
                remote: messageVietnamese.ER001('đồng tổ chức')
            },
            poster: {
                required: messageVietnamese.ER0011,
                extension: messageVietnamese.ER009('.png, .jpg/.jpeg, gif, svg')
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
            form.action = '/api/event' 
            form.submit()
        }
    })
})


// UPDATE EVENT
$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_event')

    // Add new club
    let i = 1
    $('#add-input-club-event').click(function() {
        let $id = `club-event-${++i}`
        let $clubInput = $('#club-event-1').clone().attr('id', $id).removeClass('has-error')
        let $parent = $('<div class="row" style="margin-top: 10px;"></div')
        let $icon = $('<div class="col-md-1 fv-row"><div class="btn btn-icon btn-active-light-primary remove-club"><i style="font-size: larger" class="fa-solid fa-square-minus"></i></div</div>')
        let $baseInput = $('<div class="col-md-11 fv-row"></div>')
        $baseInput.append($clubInput)
        $parent.append($baseInput)
        $parent.append($icon)
        $('#main-club-input').after($parent)
        $(`#${$id}`).rules('add',  { 
            remote: {
                url: '/api/check-club',
                type: 'post',
                data: {
                    club: function() {
                        return $(`#${$id}`).val();
                    }
                },
                dataType: 'json'
            },
            messages: {
                remote: messageVietnamese.ER007('Đồng tổ chức')
            }
         })

        // Remove club
        $('.remove-club').click(function() {
            $(`#${$id}`).rules( 'remove');
            this.closest('div.row').remove()
        })
    })

    // Reset validation and value
    $('.modal_event_cancel').click(function() {
        $('.has-error').removeClass('has-error')
        $('.validation-error-message').remove()
        $($inputForm)[0].reset()
    })

    const inputName = {
        input1: 'eventId',
        input2: 'eventName',
        input3: 'poster',
        input4: 'date',
        input5: 'club'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('ID sự kiện'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input1']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input1']}Length`, 30, 'ID sự kiện')

    methodValidation.empty(`${inputName['input2']}Empty`, messageVietnamese.ER001('tên sự kiện'))
    methodValidation.twoBytes(`${inputName['input2']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.specialCharacters(`${inputName['input2']}Characters`, messageVietnamese.ER0012)
    methodValidation.maxLength(`${inputName['input2']}Length`, 300, 'tên sự kiện')

    methodValidation.maxStorage(`${inputName['input3']}File`, messageVietnamese.ER0010('10 MB'))

    methodValidation.isDate(`${inputName['input4']}Format`, messageVietnamese.ER001('ngày diễn ra'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            eventId: {
                required: true,
                eventIdEmpty: true,
                eventIdTwoBytes: true,
                eventIdCharacters: true,
                eventIdLength: true,
                remote: {
                    url: '/api/check-event-id',
                    type: 'post',
                    data: {
                        eventId: function() {
                            return $('#eventId').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            eventName: {
                required: true,
                eventNameEmpty: true,
                eventNameTwoBytes: true,
                eventNameCharacters: true,
                eventNameLength: true
            },
            date: {
                required: true,
                dateFormat: true
            },
            'club[]': {
                remote: {
                    url: '/api/check-club',
                    type: 'post',
                    data: {
                        club: function() {
                            return $('#club-event-1').val();
                        }
                    },
                    dataType: 'json'
                }
            },
            poster: {
                required: true,
                extension: 'png|jpg|jpeg|gif|svg',
                posterFile: 10
            }
        },
        messages: {
            eventId: {
                required: messageVietnamese.ER001('ID sự kiện'),
                remote: messageVietnamese.ER007('ID sự kiện')
            },
            eventName: {
                required: messageVietnamese.ER001('tên sự kiện')
            },
            date: {
                required: messageVietnamese.ER001('ngày diễn ra')
            },
            'club[]': {
                remote: messageVietnamese.ER001('đồng tổ chức')
            },
            poster: {
                required: messageVietnamese.ER0011,
                extension: messageVietnamese.ER009('.png, .jpg/.jpeg, gif, svg')
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
            form.action = '/api/event' 
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