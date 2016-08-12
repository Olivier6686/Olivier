function generateRandomNumbers() {
    var number1 = Math.floor((Math.random() * 20) + 1);
    var number2 = Math.floor((Math.random() * 20) + 1);
    document.getElementById("num1").innerHTML = number1;
    document.getElementById("num2").innerHTML = number2;
}

function onConfirmClick() {
    var realName = document.getElementById("realname").value;
    var userName = document.getElementById("username").value;
    var psw = document.getElementById("psw").value;
    var rpsw = document.getElementById("re_psw").value;
    var sum = parseInt(document.getElementById("sum").value, 10);

    if (checkSum(sum) && checkPassword(psw, rpsw)) {
        //TODO: Send telegram to server;
        setWarningMsg(false, "");
    }
}

function onCancelClick() {
    document.getElementById("realname").value = "";
    document.getElementById("username").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("re_psw").value = "";   
    document.getElementById("sum").value = "";
}

function checkSum(sum) {
    var num1 = parseInt(document.getElementById("num1").innerHTML, 10);
    var num2 = parseInt(document.getElementById("num2").innerHTML, 10);
    

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