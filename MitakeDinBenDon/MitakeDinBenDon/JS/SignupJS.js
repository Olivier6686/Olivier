function generateRandomNumbers() {
    var number1 = Math.floor((Math.random() * 20) + 1);
    var number2 = Math.floor((Math.random() * 20) + 1);
    $("#num1").html(number1);
    $("#num2").html(number2);
}

function onConfirmClick() {
    var realName = $("#realname").val();
    var userName = $("#username").val();
    var psw = $("#psw").val();
    var rpsw = $("#re_psw").val();
    var mail = $("#email").val();
    var sum = parseInt($("#sum").val(), 10);

    if (checkSum(sum) && checkPassword(psw, rpsw) && validateEmail(mail)) {
        setWarningMsg(false, "");
        var api = ServerURL + "/CreateAccount";
        var parameter = {
            param: { UserName: userName, RealName: realName, Password: psw, Email: mail },
            type: "POST",
            success: (args) => { onCreateAccountSuccess(args) },
            error: (args) => { onCreateAccountError(args) }
        }

        query(api, parameter);
    }
}

function onCreateAccountSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        setSessionStorage("UserName", $("#username").val());
        setSessionStorage("OrderList", "[]");
        window.location.assign("OrderPage.html");
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onCreateAccountError(args) {
    setWarningMsg(true, "Some errors occur");
}

function onCancelClick() {
    $("#realname").val("");
    $("#username").val("");
    $("#psw").val("");
    $("#re_psw").val("");
    $("#sum").val("");
}

function checkSum(sum) {
    var num1 = parseInt($("#num1").html(), 10);
    var num2 = parseInt($("#num2").html(), 10);

    if ((num1 + num2) == sum)
        return true;

    setWarningMsg(true, "The Answer is incorrect");
    return false;
}

function checkPassword(psw, rpsw) {
    if (psw == rpsw)
        return true;

    setWarningMsg(true, "Please enter correct password again");
    return false;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email))
        return true;

    setWarningMsg(true, "The E-Mail incorrect");
    return false;
}
