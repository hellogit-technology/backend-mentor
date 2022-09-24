

$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_event')

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

    $inputForm.validate({
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
            club: {
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
            club: {
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