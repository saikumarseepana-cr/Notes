function validateEmail(somExpOfEmailField, somExpOfConfirmEmailField, somExpErrorMessage) {
    var emailField = guideBridge.resolveNode(somExpOfEmailField);
    var confirmEmailField = guideBridge.resolveNode(somExpOfConfirmEmailField);
    var errorMessageField = guideBridge.resolveNode(somExpErrorMessage);
    if (!emailField || !confirmEmailField || !errorMessageField) {
        return;
    }

    var emailElement = document.querySelector("." + emailField.name + " input");
    var confirmEmailElement = document.querySelector("." + confirmEmailField.name + " input");
    if (!emailElement || !confirmEmailElement) {
        return;
    }

    var emailVisited = false;
    var confirmEmailVisited = false;
    errorMessageField.visible = false;
    emailElement.addEventListener("focus", function () {
        emailVisited = true;
    });
    confirmEmailElement.addEventListener("focus", function () {
        confirmEmailVisited = true;
    });
    confirmEmailElement.addEventListener("blur", function () {

        var emailValue = emailField.value;
        var confirmEmailValue = confirmEmailField.value;

        var bothVisited = emailVisited && confirmEmailVisited;
        var isEmailEmpty = !emailValue;
        var isConfirmEmailEmpty = !confirmEmailValue;

        if ( bothVisited && isEmailEmpty && isConfirmEmailEmpty) { 
            emailField.validate();
            confirmEmailField.validate();
            errorMessageField.visible = true;
        } else if (!isEmailEmpty || !isConfirmEmailEmpty) {
            errorMessageField.visible = false;
        }
    });
}
//both empty & emailvalid 