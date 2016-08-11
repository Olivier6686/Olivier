var OrderForm;
var StoreID;
var Menu;

function queryStoreInfo() {
    var url = window.location.search;
    var id = getParameterByName("OrderFormID", url);
    getOrderFormsByID(id);
}

function getParameters() {
    $("#titleSpan").html(OrderForm.Title);
    $("#descriptionSpan").html(OrderForm.Description);
    $("#expiredTimeSpan").html(OrderForm.ExpiredTime);
    StoreID = OrderForm.StoreID;
}

function getOrderFormsByID(id) {
    var api = ServerURL + "/GetOrderFormsByID";
    var parameter = {
        param: { OrderFormIDs: id },
        type: "GET",
        success: (args) => { onGetOrderFormSuccess(args) },
        error: (args) => { onGetOrderFormError(args) }
    }

    query(api, parameter);
}

function onGetOrderFormSuccess(args) {
    if (args.IsSucceed) {
        OrderForm = args.Items[0];
        getParameters();
        getStoreByID(OrderForm.StoreID, onGetStoreByIDSuccess, onGetStoreByIDError);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onGetOrderFormError(args) {
    setWarningMsg(true, "Some errors occur");
}

function onGetStoreByIDSuccess(args) {
    if (args.IsSucceed) {
        createStatisticsTable();
        createStoreInfoTable(args.Store);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onGetStoreByIDError(args) {
    setWarningMsg(true, "Some errors occur");
}

function createStatisticsTable() {
    queryMenu(StoreID, onStatisticsTableSuccess, onStatisticsTableError);
}

function createOrderTable() {
    clearChild("productTable");
    var table = document.getElementById("productTable");
    var attendanceName = getLocalStorage("AttendanceName");
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

    for (var i = 0; i < Menu.Items.length; i++) {
        var num = table.rows.length;
        var tr = table.insertRow(num);
        var subCategory = Menu.Items[i];
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = subCategory.SubTitle;
        td.colSpan = 4;
        td.className = "SubTitle";
        for (var j = 0; j < subCategory.Items.length; j++) {
            var num = table.rows.length;
            var tr = table.insertRow(num);
            td = tr.insertCell(tr.cells.length);
            td.id = subCategory.Items[j].ItemID;
            td.innerHTML = subCategory.Items[j].Name;
            td = tr.insertCell(tr.cells.length);

            var prices = subCategory.Items[j].Price.split(",");
            for (var k = 0; k < prices.length; k++) {
                var price = prices[k].split(":");
                var num = price.length == 2 ? price[1] : price[0];
                var tail = '">';
                var genStr = '<input type="radio" id="' + k + '" name="price_' + subCategory.Items[j].ItemID + '"value="' + num + tail + prices[k];
                td.innerHTML += genStr;
            }

            var numInput = document.createElement("input");
            numInput.type = "number";
            numInput.min = 0;
            numInput.name = "numInput";
            numInput.onchange = onNumberChange;
            td = tr.insertCell(tr.cells.length);
            td.appendChild(numInput);

            var text = document.createElement("input");
            text.type = "text";
            td = tr.insertCell(tr.cells.length);
            td.appendChild(text);
        }
    }
}

function onNumberChange(e) {
    var num = e.currentTarget;
    if (num.value == 0) {
        num.value = "";
        var td = num.parentNode; //num的parent為td
        var tr = td.parentNode;

        var rbs = tr.cells[1].getElementsByTagName('input'); //radio buttons
        for (var i = 0; i < rbs.length; i++) {
            rbs[i].checked = false;
        }

        var description = tr.cells[3].childNodes[0]; //input text
        description.value = "";
    }
}

function onStatisticsTableSuccess(args) {
    if (args.IsSucceed) {
        clearChild("productTable");
        Menu = args.Menu;
        Menu.Items = JSON.parse(b64DecodeUnicode(Menu.Items));
        var table = document.getElementById("productTable");
        if (!isStringEmpty(OrderForm.Attendance))
            OrderForm.Attendance = JSON.parse(OrderForm.Attendance);

        if (OrderForm.Attendance.length > 0) {
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
            td = tr.insertCell(5);
            td.innerHTML = "Action";

            for (var i = 0; i < OrderForm.Attendance.length; i++) {
                var detail = { name: undefined, price: undefined };
                var exist = getOrderItem(Menu.Items, OrderForm.Attendance[i].ItemID, OrderForm.Attendance[i].CheckIndex, detail);
                if (exist) {
                    var num = table.rows.length;
                    var tr = table.insertRow(num);
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = detail.name;
                    td.id = OrderForm.Attendance[i].ItemID;
                    td.name = OrderForm.Attendance[i].AttendanceID;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = OrderForm.Attendance[i].Amount;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = detail.price;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = OrderForm.Attendance[i].Name;
                    td = tr.insertCell(tr.cells.length);
                    td.innerHTML = OrderForm.Attendance[i].Description;

                    td = tr.insertCell(tr.cells.length);
                    var btn = document.createElement("button");
                    btn.innerHTML = "Delete";
                    btn.style.width = "100%";
                    btn.onclick = onDeleteClick;
                    td.appendChild(btn);

                    total += calculateTotalPrice(OrderForm.Attendance[i].Amount, detail.price);
                }
            }

            var tr = table.insertRow(table.rows.length);
            td = tr.insertCell(0);
            td.innerHTML = "Total"
            td = tr.insertCell(tr.cells.length);
            td.colSpan = 5;
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

function onStatisticsTableError(args) {
    setWarningMsg(true, "Some errors occur");
}

function getOrderItemByName(attendanceName, itemID, detail) {
    for (var i = 0; i < OrderForm.Attendance.length; i++) {
        if (OrderForm.Attendance[i].Name == attendanceName && OrderForm.Attendance[i].ItemID == itemID) {;
            detail.amount = OrderForm.Attendance[i].Amount;
            detail.description = OrderForm.Attendance[i].Description;
            detail.checkIndex = OrderForm.Attendance[i].CheckIndex;
            return true;
        }
    }
    return false;
}

function getOrderItem(menu, itemID, checkIndex, detail) {
    for (var i = 0; i < menu.length; i++) {
        var subCategory = menu[i];
        for (var j = 0; j < subCategory.Items.length; j++) {
            if (subCategory.Items[j].ItemID == itemID) {
                detail.name = subCategory.Items[j].Name;
                detail.price = subCategory.Items[j].Price.split(",")[checkIndex];
                return true;
            }
        }
    }
    return false;
}

function calculateTotalPrice(amount, price) {
    var itemPrice = price.split(":");
    var num = itemPrice.length == 2 ? itemPrice[1] : itemPrice[0];
    var total = parseInt(amount, 10) * parseInt(num, 10);
    return total;
}

function onOrderClick() {
    $("#attendanceDiv").css("display", "block");
    $("#emptyDiv").css("display", "none");
    createOrderTable()
}

function onConfirmClick() {
    setWarningMsg(false, "");
    var name = $("#attendanceName").val();

    if (isStringEmpty(name)) {
        setWarningMsg(true, "Please fill attendance name");
        return;
    }

    var attendance = createAttendanceToSend(name);
    setLocalStorage("AttendanceName", name);
    var api = ServerURL + "/UpateOrderFormAttendance";
    var parameter = {
        param: { OrderFormID: OrderForm.OrderFormID, Attendance: attendance },
        type: "POST",
        success: (args) => { onUpateOrderFormAttendanceSuccess(args) },
        error: (args) => { onUpateOrderFormAttendanceError(args) }
    }

    query(api, parameter);
}

function createAttendanceToSend(name) {
    var table = document.getElementById("productTable");
    var nums = document.getElementsByName("numInput");
    var attendanceList = [];

    for (var i = 0; i < nums.length; i++) {
        var num = nums[i];
        if (num.value > 0) {
            var td = num.parentNode; //num的parent為td
            var tr = td.parentNode; //td的parent為tr
            var detail = { itemID: undefined, checkIndex: undefined };
            var exist = getCheckPriceID(tr.cells[1], detail); //找到了哪一個子項目被選取了
            if (exist) {
                var id = generateGUID();
                var attendance = { AttendanceID: id, Name: name, ItemID: detail.itemID, CheckIndex: detail.checkIndex, Amount: tr.cells[2].childNodes[0].value, Description: tr.cells[3].childNodes[0].value }
                attendanceList.push(attendance);
            }
        }
    }

    return JSON.stringify(attendanceList);
}

function getCheckPriceID(td, detail) {
    for (var i = 0; i < td.children.length; i++) {
        if (td.children[i].checked) {
            var itemID = td.children[i].name.split("_")[1];
            detail.itemID = itemID;
            detail.checkIndex = td.children[i].id;
            return true;
        }
    }
    return false;
}

function onUpateOrderFormAttendanceSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        $("#attendanceDiv").css("display", "none");
        $("#emptyDiv").css("display", "block");
        getOrderFormsByID(OrderForm.OrderFormID);
    }
    else {
        setWarningMsg(true, "Order failed");
    }
}

function onUpateOrderFormAttendanceError(args) {
    setWarningMsg(true, "Some errors occur");
}

function onDeleteClick(e) {
    var btn = e.currentTarget;
    var td = btn.parentNode; //num的parent為td
    var tr = td.parentNode; //td的parent為tr

    var itemID = tr.cells[0].id; //id裡面存放itemID
    var attendanceID = tr.cells[0].name //name裡面存放attendanceID
    var attendanceName = tr.cells[3].innerHTML;
    var table = document.getElementById("productTable");
    table.deleteRow(tr.rowIndex);

    var api = ServerURL + "/DeleteOrderFormItem";
    var parameter = {
        param: { OrderFormID: OrderForm.OrderFormID, AttendanceID: attendanceID },
        type: "POST",
        success: (args) => { onDeleteSuccess(args) },
        error: (args) => { onDeleteError(args) }
    }

    query(api, parameter);
}

function onDeleteSuccess(args) {
    if (args.IsSucceed) {
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onDeleteError(args) {
    setWarningMsg(true, "Some errors occur");
}

//舊版的，會把有點過的產品加上去的，先不用他
function createOrderTable2() {
    clearChild("productTable");
    var table = document.getElementById("productTable");
    var attendanceName = getLocalStorage("AttendanceName");

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

    for (var i = 0; i < Menu.Items.length; i++) {
        var num = table.rows.length;
        var tr = table.insertRow(num);
        var subCategory = Menu.Items[i];
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = subCategory.SubTitle;
        td.colSpan = 4;
        td.className = "SubTitle";
        for (var j = 0; j < subCategory.Items.length; j++) {
            var num = table.rows.length;
            var tr = table.insertRow(num);
            td = tr.insertCell(tr.cells.length);
            td.id = subCategory.Items[j].ItemID;
            td.innerHTML = subCategory.Items[j].Name;
            td = tr.insertCell(tr.cells.length);

            var detail = { amount: undefined, description: undefined, checkIndex: undefined };
            var exist = getOrderItemByName(attendanceName, subCategory.Items[j].ItemID, detail);

            var prices = subCategory.Items[j].Price.split(",");
            for (var k = 0; k < prices.length; k++) {
                var price = prices[k].split(":");
                var num = price.length == 2 ? price[1] : price[0];
                var tail = '">';
                if (exist)
                    tail = '" checked>';
                var genStr = '<input type="radio" id="' + k + '" name="price_' + subCategory.Items[j].ItemID + '"value="' + num + tail + prices[k];
                td.innerHTML += genStr;
            }

            var numInput = document.createElement("input");
            numInput.type = "number";
            numInput.min = 0;
            numInput.name = "numInput";
            numInput.onchange = onNumberChange;
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