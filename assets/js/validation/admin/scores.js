// CREATE SCORES
$(document).ready(function() {
    const $inputForm = $('#user-input-form-validate')

    // Auto complete
    

    const inputName = {
        input1: 'schoolId',
        input2: 'fullname',
        input3: 'email',
        input4: ''
    }

    methodValidation.empty(inputName['input1'], messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(inputName['input1'], messageVietnamese.ER004)
    methodValidation.maxLength(inputName['input1'], 30, 'họ và tên')
    
    methodValidation.email(inputName['input2'], messageVietnamese.ER003)
    methodValidation.maxLength(inputName['input2'], 100, 'email')

    $inputForm.validate({
        onfocusout: function(element) {
            this.element(element); 
        },
        rules: {
            
        },
        messages: {

        },
        submitHandler: function(form) {
            form.submit()
        }

    })
})