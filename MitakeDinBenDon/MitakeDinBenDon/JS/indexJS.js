function sendLoginPost() {
    var name = $("#username").val();
    var psw = $("#psw").val();

    if (isStringEmpty(name) || isStringEmpty(psw)) {
        setWarningMsg(true, "Please fill user name and password");
        return;
    }      

    var api = ServerURL + "/login";
    var parameter = {
        param: { UserName: name, Password: psw },
        type: "POST",
        success: (args) => { onLoginSuccess(args) },
        error: (args) => { onLoginError(args) }
    }

    query(api, parameter);
}

function onCancelClick() {
    $("#username").val("");
    $("#psw").val("");
}

function onLoginSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        setSessionStorage("UserName", args.UserName);
        var decodedOrderList = atob(args.OrderList);
        setSessionStorage("OrderList", decodedOrderList);
        window.location.assign("HTML/OrderPage.html");
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onLoginError(args) {
    setWarningMsg(true, "Some errors occur");
}