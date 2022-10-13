$(document).ready(function() {
    const $inputForm = $('#kt_modal_evaluation_form_poster')

    const inputName = {
        input1: 'poster',
    }

    methodValidation.maxStorage(`${inputName['input1']}File`, messageVietnamese.ER0010('10 MB'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            poster: {
                extension: 'png|jpg|jpeg|gif|svg',
                posterFile: 10
            }
        },
        messages: {
            poster: {
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
            form.action = '/api/poster'
            form.submit()
        }
    })
})