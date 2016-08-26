var Menu = [];

function checkSessionValid() {
    querySessionValid(onSessionValidSuccess);
}

function onSessionValidSuccess(args) {
    if (args.IsSucceed) {
        //Do Nothing!
    }
    else {
        window.location.assign("../index.HTML");
    }
}

function onAddClick() {
    setWarningMsg(false, "");

    var name = $("#name_input").val();
    if (isStringEmpty(name)) {
        setWarningMsg(true, "Name is must to fill");
        return;
    }

    var price = $("#item_input").val();
    if (isStringEmpty(price)) {
        setWarningMsg(true, "Item is must to fill");
        return;
    }

    var category = $("#category_input").val();
    if (isStringEmpty(category)) {
        setWarningMsg(true, "Category is must to fill");
        return;
    }

    if (!validateItem(price)) {
        setWarningMsg(true, "Item format incorrect");
        return;
    }

    var id = getNextItemID();
    var item = { ItemID: id, Name: name, Price: price }

    addItemIntoMenu(category, item);
    createOverviewTable();

    $("#name_input").val("");
    $("#item_input").val("");
}

function getNextItemID() {
    var index = 0;

    if (Menu.length > 0) {
        index = Math.max.apply(Math, Menu[0].Items.map(function (item) { return item.ItemID; }))
        for (var i = 1; i < Menu.length; i++) {
            var max = Math.max.apply(Math, Menu[i].Items.map(function (item) { return item.ItemID; }))
            if (max >= index)
                index = max;
        }
        index++;
    }

    return index;
}

function addItemIntoMenu(category, item) {
    for (var i = 0; i < Menu.length; i++) {
        var sub = Menu[i];
        if (sub.SubTitle == category) {
            sub.Items.push(item);
            return;
        }
    }

    var subCategory = { SubTitle: category, Items: [item] };
    Menu.push(subCategory);
}

function createOverviewTable() {
    clearChild("overviewTable");
    var table = document.getElementById("overviewTable");

    var tr = table.insertRow(0);
    td = tr.insertCell(0);
    td.innerHTML = "Name"
    td = tr.insertCell(1);
    td.innerHTML = "Price";

    for (var i = 0; i < Menu.length; i++) {
        var num = table.rows.length;
        var tr = table.insertRow(num);
        var subCategory = Menu[i];
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = subCategory.SubTitle;
        td.colSpan = 2;
        td.className = "SubTitle";
        for (var j = 0; j < subCategory.Items.length; j++) {
            var num = table.rows.length;
            var tr = table.insertRow(num);
            td = tr.insertCell(tr.cells.length);
            td.id = subCategory.Items[j].ItemID;
            td.innerHTML = subCategory.Items[j].Name;

            td = tr.insertCell(tr.cells.length);
            td.innerHTML = subCategory.Items[j].Price;

            //var modifyButton = document.createElement("button");
            //modifyButton.className = "baseButton modifyButton right";
            //modifyButton.onclick = onModifyClick;

            var deleteButton = document.createElement("button");
            deleteButton.className = "baseButton deleteButton right";
            deleteButton.onclick = onDeleteClick;

            //td.appendChild(modifyButton);
            td.appendChild(deleteButton);
        }
    }
}

function onConfirmClick() {
    var name = $("#storeName_input").val();
    var address = $("#address_input").val();
    var phone = $("#phone_input").val();

    if (isStringEmpty(name) || isStringEmpty(address) || isStringEmpty(phone)) {
        setWarningMsg(true, "Store parameters error");
        return;
    }

    if (Menu.length == 0) {
        setWarningMsg(true, "Menu can not be null");
        return;
    }

    var api = ServerURL + "/CreateMenu";
    var str = JSON.stringify(Menu);
    var parameter = {
        param: { Items: str },
        type: "POST",
        success: (args) => { onCreateMenuSuccess(args) },
        error: (args) => { onCreateMenuError(args) }
    }

    query(api, parameter);
}

function onCancelClick() {
    $("#name_input").val("");
    $("#item_input").val("");
    $("#category_input").val("");
    $("#storeName_input").val("");
    $("#address_input").val("");
    $("#phone_input").val("");
    $("#fax_input").val("");
    clearChild("overviewTable");
}

function onCreateMenuSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        createStore("221", args.MenuID);

        //如果需要加入postal code則需要使用下面程式碼
        //var action = {
        //    address: $("#address_input").val(),
        //    success: (postalCode) => { createStore(postalCode); },
        //    error: (postalCode) => { createStore(postalCode); }
        //}

        //decodeAddress(action);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onCreateMenuError(args) {
    setWarningMsg(true, "Some errors occur");
}

function createStore(postalCode, menuID) {
    var name = $("#storeName_input").val();
    var address = $("#address_input").val();
    var phone = $("#phone_input").val();
    var fax = $("#fax_input").val();

    var api = ServerURL + "/CreateStore";
    var parameter = {
        param: { StoreName: name, Address: address, Phone: phone, Fax: fax, MenuID: menuID },
        type: "POST",
        success: (args) => { onCreateStoreSuccess(args) },
        error: (args) => { onCreateStoreError(args) }
    }

    query(api, parameter);
}

function onCreateStoreSuccess(args) {
    if (args.IsSucceed) {
        alert("Create store Success!");
    }
    else {
        setWarningMsg(true, "Create store Fail!");
    }
}

function onCreateStoreError(args) {
    setWarningMsg(true, "Some errors occur");
}

function onDeleteClick(e) {
    var btn = e.currentTarget;
    var tr = btn.parentNode.parentNode;
    var id = tr.cells[0].id;

    for (var i = 0; i < Menu.length; i++) {
        var sub = Menu[i];
        for (var j = 0; j < sub.Items.length; j++) {
            if (sub.Items[j].ItemID == id) {
                sub.Items.splice(j, 1);
            }
        }
    }

    var table = document.getElementById("overviewTable");
    table.childNodes[0].removeChild(tr);
}

function validateItem(price) {
    var pattern = /(([\u4e00-\u9fa5_a-zA-Z0-9]+:[0-9]+$)|(^[0-9]+$))/;
    var array = price.split(',');
    for (var i = 0; i < array.length; i++) {
        if (!pattern.test(array[i]))
            return false;
    }

    return true;
}

function decodeAddress(action) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": action.address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var postalCode = getPostalCode(results[0]);
            if (typeof action.success === 'function') {
                action.success(postalCode);
            }
        }
        else {
            if (typeof action.error === 'function') {
                action.error(undefined);
            }
        }
    });
}

function getPostalCode(locationObject) {
    var postalCode = undefined;
    for (var i = 0; i < locationObject.address_components.length; i++) {
        if (locationObject.address_components[i].types[0] == "postal_code") {
            postalCode = locationObject.address_components[i].long_name;
        }
    }
    return postalCode;
}

