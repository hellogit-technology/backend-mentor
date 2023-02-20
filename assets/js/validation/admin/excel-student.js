


$(document).ready(function() {
    const $inputForm = $('#modal_upload_excel_form')

    const inputName = {
        input1: 'students',
    }

    methodValidation.maxStorage(`${inputName['input1']}File`, messageVietnamese.ER0010('5 MB'))

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element);
        },
        rules: {
            students: {
                required: true,
                extension: 'xlsx',
                studentsFile: 5
            }
        },
        messages: {
            students: {
                required: messageVietnamese.ER0011,
                extension: messageVietnamese.ER009('excel'),
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
            form.action = '/api/file-students'
            form.submit()
        }
    })
})