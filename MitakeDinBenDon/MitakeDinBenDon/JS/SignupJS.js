function generateRandomNumbers() {
    var number1 = Math.floor((Math.random() * 20) + 1);
    var number2 = Math.floor((Math.random() * 20) + 1);
    document.getElementById("num1").innerHTML = number1;
    document.getElementById("num2").innerHTML = number2;
}

function onCancelClick() {
    document.forms["accountForm"]["realname"].value = "";
    document.forms["accountForm"]["username"].value = "";
    document.forms["accountForm"]["psw"].value = "";
    document.forms["accountForm"]["re_psw"].value = "";
    document.forms["accountForm"]["sum"].value = "";
}

function createAccount() {
    if (checkSum() && checkReenterPassword()) {
        document.forms["accountForm"].submit();
    }
}

function checkSum() {
    var num1 = parseInt(document.getElementById("num1").innerHTML, 10);
    var num2 = parseInt(document.getElementById("num2").innerHTML, 10);

    var s = document.getElementsByName("sum").value;
    var sum = parseInt(document.forms["accountForm"]["sum"].value, 10);

    if ((num1 + num2) == sum)
        return true;
    return false;
}

function checkReenterPassword() {
    var psw = document.forms["accountForm"]["psw"].value;
    var rpsw = document.forms["accountForm"]["re_psw"].value;

    if (psw == rpsw)
        return true;
    return false;
}