

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
            required: true,
            messages: {
                required: messageVietnamese.ER001('đồng tổ chức')
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
        input1: 'eventName',
        input2: 'date',
        input3: 'club',
        input4: 'poster'
    }

    methodValidation.empty(`${inputName['input1']}Empty`, messageVietnamese.ER001('tên sự kiện'))
    methodValidation.twoBytes(`${inputName['input1']}TwoBytes`, messageVietnamese.ER004)
    methodValidation.maxLength(`${inputName['input1']}Length`, 200, 'tên sự kiện')
    
    methodValidation.maxStorage(`${inputName['input4']}File`, messageVietnamese.ER0010('10 MB'))

    const $validator = $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            eventName: {
                required: true,
                eventNameEmpty: true,
                eventNameTwoBytes: true,
                eventNameLength: true
            },
            date: {
                required: true
            },
            'club[]': {
                required: true
            },
            poster: {
                required: true,
                extension: 'png|jpg|jpeg|gif|svg',
                posterFile: 10
            }
        },
        messages: {
            eventName: {
                required: messageVietnamese.ER001('tên sự kiện')
            },
            date: {
                required: messageVietnamese.ER001('ngày diễn ra')
            },
            'club[]': {
                required: messageVietnamese.ER001('đồng tổ chức')
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