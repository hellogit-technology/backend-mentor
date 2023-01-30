
class MethodValidation {

    // Check max length input
    maxLength(nameMethod, max, inputName) {
        $.validator.addMethod(nameMethod, function(value, element) {
            const valueLength = value.length;
            if(valueLength) {
                return valueLength <= max
            }
            return true;
        }, function(length, element) { 
            const currentlyNum = $(element).val().length
            return messageVietnamese.ER002A(inputName, max, currentlyNum);
        })  
    }

    // Check min length input
    minLength(nameMethod, min, inputName) {
        $.validator.addMethod(nameMethod, function(value, element) {
            const valueLength = value.length;
            if(valueLength) {
                return valueLength >= min
            }
            return true;
        }, function(length, element) { 
            const currentlyNum = $(element).val().length
            return messageVietnamese.ER002B(inputName, min, currentlyNum);
        })
    }

    // Check valid email
    email(nameMethod, message) {
        $.validator.addMethod(nameMethod, function(value, element) { 
            var regex =
            /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
            return this.optional(element) || regex.test(value); 
        }, message);
    
    }

    // Check special / two bytes characters
    twoBytes(nameMethod, message ) {
        $.validator.addMethod(nameMethod, function(value, element) {
            return this.optional(element) || !/[\uD800-\uDFFF\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(value);
        }, message)
    }

    // Check empty input
    empty(nameMethod, message) {
        $.validator.addMethod(nameMethod, function(value, element) { 
            return value === '' || value.trim().length !== 0;  
        }, message);
    }

    // Check date
    isDate(nameMethod, message) {
        $.validator.addMethod(nameMethod, function(value, element) {
            if(value) {
                const date = new Date(value)
                return date instanceof Date && !isNaN(date);
            }
            return true
        }, message)
    }

    // Check storage 
    maxStorage(nameMethod, message) {
        $.validator.addMethod(nameMethod, function(value, element, param) {
            return this.optional(element) || (element.files[0].size <= param * 1000000)  //? MB
        }, message);
    }

    // Check special characters
    specialCharacters(nameMethod, message) {
        $.validator.addMethod(nameMethod, function(value, element) {
            var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return this.optional(element) || !regex.test(value)
        }, message)
    }

}

const methodValidation = new MethodValidation