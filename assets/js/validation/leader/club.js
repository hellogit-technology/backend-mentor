import { messageVietnamese } from '../message';
import methodValidation from '../method-validation'

$(document).ready(() => {
    const $inputForm = $('#user-input-form-validate')

    const inputName = {
        input1: 'fullName',
        input2: 'email',
        input3: 'campus'
    }

    methodValidation.empty(inputName['input1'], messageVietnamese.ER001('họ và tên'))
    methodValidation.twoBytes(inputName['input1'], messageVietnamese.ER004)
    methodValidation.maxLength(inputName['input1'], 30, 'họ và tên')
    
    methodValidation.email(inputName['input2'], messageVietnamese.ER003)
    methodValidation.maxLength(inputName['input2'], 100, 'email')

    $inputForm.validate({
        onfocusout: (element) => {
            this.element(element); //< inside 'validate()' method, this is like 'valid()'
        },
        rules: {

        },
        messages: {

        },
        submitHandler: (form) => {
            form.submit()
            $('#btn-update-user').attr('disabled', true);
            $("#btn-delete-user-prevent").attr("disabled", true);
        }

    })
})