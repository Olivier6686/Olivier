function sendLoginPost() {
    var name = document.getElementById("username").value;
    var psw = document.getElementById("psw").value;

    if (isStringEmpty(name) || isStringEmpty(psw))
        setWarningMsg(true, "Please fill user name and password");

    var api = ServerURL + "/login";
    var parameter = {
        param: { UserName: name, Password: psw },
        type: "POST",
        success: (args) => { onLoginSuccess(args) },
        error: (args) => { onLoginError(args) }
    }

    query(api, parameter);

    //$.ajax({
    //    url: "http://10.1.4.133:8888/login",
    //    data: { UserName: name, Password: psw },
    //    type: "POST",
    //    dataType: "json",

    //    success: function (data, textStatus) {
    //        if (data.IsSucceed) {
    //            setWarningMsg(false, "");
    //            setSessionStorage("UserName", data.UserName);
    //            setSessionStorage("OrderList", data.OrderList);
    //            window.location.assign("HTML/OrderPage.html");
    //        }
    //        else {
    //            setWarningMsg(true, "User name or Password failed");
    //        }
    //    },

    //    error: function (xhr, ajaxOptions, thrownError) {
    //        setWarningMsg(true, thrownError);
    //    }
    //});
}

function onCancelClick() {
    document.forms["accountForm"]["username"].value = "";
    document.forms["accountForm"]["psw"].value = "";
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