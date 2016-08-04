var orderForm;
var modal;
var storeID;

function queryStoreInfo() {
    var url = window.location.search;
    var id = getParameterByName("OrderFormID", url);

    var api = serverURL + "/GetOrderFormsByID";
    var parameter = {
        param: { OrderFormIDs: id },
        type: "GET",
        success: (args) => { onGetOrderFormSuccess(args) },
        error: (args) => { onGetOrderFormError(args) }
    }

    query(api, parameter);
}

function getParameters() {
    document.getElementById("titleSpan").innerHTML = orderForm.Title;
    document.getElementById("descriptionSpan").innerHTML = orderForm.Description;
    document.getElementById("expiredTimeSpan").innerHTML = orderForm.ExpiredTime;

    var storeJson = getSessionStorage("StoreInfo");
    var store = JSON.parse(storeJson);

    return store;
}

function onGetOrderFormSuccess(args) {
    if (args.IsSucceed) {
        orderForm = args.Items[0];
        var store = getParameters();
        storeID = store.StoreID;

        createStatisticsTable();
        createStoreInfoTable(store);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onGetOrderFormError(args) {
    setWarningMsg(true, "Some errors occur");
}

function createOrderTable() {
    //var menu = JSON.parse(menuJson);
    queryMenu(storeID, onOrderTableSuccess, onError);
}

function createStatisticsTable() {
    //var menu = JSON.parse(menuJson);
    queryMenu(storeID, onStatisticsTableSuccess, onError);
}

function onOrderTableSuccess(args) {
    if (args.IsSucceed) {
        clearChild("productTable");
        var menu = args.Menu;
        menu.Items = JSON.parse(b64DecodeUnicode(menu.Items));
        var table = document.getElementById("productTable");
        var attendanceName = getLocalStorage("AttendanceName");
        attendanceName = "alvin.wang";
        document.getElementById("attendanceName").value = attendanceName;

        var tr = table.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = "Name"
        td = tr.insertCell(1);
        td.innerHTML = "Price";
        td = tr.insertCell(2);
        td.innerHTML = "Amount";
        td = tr.insertCell(3);
        td.innerHTML = "Description";

        for (var i = 0; i < menu.Items.length; i++) {
            var num = table.rows.length;
            var tr = table.insertRow(num);
            var subCategory = menu.Items[i];
            td = tr.insertCell(tr.cells.length);
            td.innerHTML = subCategory.SubTitle;
            td.colSpan = 4;
            td.className = "SubTitle";
            for (var j = 0; j < subCategory.Items.length; j++) {
                var num = table.rows.length;
                var tr = table.insertRow(num);
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = subCategory.Items[j].Name;
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = subCategory.Items[j].Price;

                var detail = { amount: undefined, description: undefined };
                var exist = getOrderItemByName(attendanceName, subCategory.Items[j].ItemID, detail);

                var numInput = document.createElement("input");
                numInput.type = "number";
                if (exist)
                    numInput.value = detail.amount;
                td = tr.insertCell(tr.cells.length);
                td.appendChild(numInput);

                var text = document.createElement("input");
                text.type = "text";
                if (exist)
                    text.value = detail.description;
                td = tr.insertCell(tr.cells.length);
                td.appendChild(text);
            }
        }
    }
    else {
        setWarningMsg(true, "Parameter error!");
    }
}

function onStatisticsTableSuccess(args) {
    if (args.IsSucceed) {
        clearChild("productTable");
        var menu = JSON.parse(menuJson);
        var table = document.getElementById("productTable");

        if (orderForm.Attendance.length > 0) {
            document.getElementById("emptyMsg").style.opacity = 0;
            var total = 0;

            var tr = table.insertRow(0);
            td = tr.insertCell(0);
            td.innerHTML = "Name"
            td = tr.insertCell(1);
            td.innerHTML = "Amount";
            td = tr.insertCell(2);
            td.innerHTML = "Price";
            td = tr.insertCell(3);
            td.innerHTML = "Attendance"
            td = tr.insertCell(4);
            td.innerHTML = "Description";

            for (var i = 0; i < orderForm.Attendance.length; i++) {
                var detail = { name: undefined, price: undefined };
                var exist = getOrderItem(menu, orderForm.Attendance[i].ItemID, detail);
                if (exist) {
                    var num = table.rows.length;
                    var tr = table.insertRow(num);
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = detail.name;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = orderForm.Attendance[i].Amount;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = detail.price;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = orderForm.Attendance[i].Name;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = orderForm.Attendance[i].Description;
                    total += parseInt(detail.price, 10);
                }
            }

            var tr = table.insertRow(table.rows.length);
            td = tr.insertCell(0);
            td.innerHTML = "Total"
            td = tr.insertCell(tr.cells.length);
            td.colSpan = 4;
            td.innerHTML = total;
        }
        else {
            document.getElementById("emptyMsg").style.opacity = 1;
        }
    }
    else {
        setWarningMsg(true, "Parameter error!");
    }
}

function onError(args) {
    setWarningMsg(true, "Some errors occur");
}

function getOrderItemByName(attendanceName, itemID, detail) {
    for (var i = 0; i < orderForm.Attendance.length; i++) {
        if (orderForm.Attendance[i].Name == attendanceName && orderForm.Attendance[i].ItemID == itemID) {;
            detail.amount = orderForm.Attendance[i].Amount;
            detail.description = orderForm.Attendance[i].Description;
            return true;
        }
    }
    return false;
}

function getOrderItem(menu, itemID, detail) {
    for (var i = 0; i < menu.Items.length; i++) {
        var subCategory = menu.Items[i];
        for (var j = 0; j < subCategory.Items.length; j++) {
            if (subCategory.Items[j].ItemID == itemID) {
                detail.name = subCategory.Items[j].Name;
                detail.price = subCategory.Items[j].Price;
                return true;
            }
        }
    }
    return false;
}

function onOrderClick() {
    document.getElementById("attendanceDiv").style.display = "block";
    document.getElementById("emptyDiv").style.display = "none";
    createOrderTable()
}

function onConfirmClick() {
    setWarningMsg(false, "");
    var name = document.getElementById("attendanceName").value;

    if (isStringEmpty(name)) {
        setWarningMsg(true, "Please fill attendance name");
        return;
    }

    setLocalStorage("AttendanceName", name);
    //TODO: update orderform

    window.location.assign("OrderPage.html");
}

