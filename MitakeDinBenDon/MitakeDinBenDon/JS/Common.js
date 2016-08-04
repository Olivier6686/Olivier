var account = '{ "UserName": "alvin.wang", "RealName": "Alvin", "Password": "123456", "E-Mail": "alvin.wang@mitake.com.tw", "OrderList": [{ "OrderFormID": "GUID1" }, { "OrderFormID": "GUID2" }] }'

var orderList = '[{ "OrderFormID": "GUID1" }, { "OrderFormID": "GUID2" }]'

var orderForms = '[{"OrderFormID": "GUID1", "StoreID": "0AA4DD39-EBDE-47FC-A070-243E4C9C416E", "Owner": "Eason.Cheng", "Title": "Thanks Edar",' +
                   '"Description": "Tea Time", "ExpiredTime": "2016/07/22 15:00",' +
                   '"Attendance":' +
                        '[{ "Name": "edar.tsai", "ItemID": "0", "Amount": "1", "Description": "去冰半糖" },' +
                         '{ "Name": "alvin.wang", "ItemID": "0", "Amount": "6", "Description": "去冰半糖" },' +
                         '{ "Name": "alvin.wang", "ItemID": "1", "Amount": "1", "Description": "無糖" },' +
                         '{ "Name": "alvin.wang", "ItemID": "2", "Amount": "5", "Description": "去冰無糖" }]},' +
                  '{"OrderFormID": "GUID2", "StoreID": "A1689486-ADEE-4A6E-BA4A-2C59A17256EF", "Owner": "Jim.Liu", "Title": "Thanks Eason",' +
                   '"Description": "Tea Time~~", "ExpiredTime": "2016/07/22 15:00",' +
                   '"Attendance":[]}]'

var menuArray = '[{"MenuID": "Menu1", "Items": [{"SubTitle": "找好茶", "Items":' +
                 '[{ "ItemID": "0", "Name": "四季春茶", "Price": "45" },' +
                  '{ "ItemID": "1", "Name": "黃金烏龍", "Price": "40" }]},' +
           '{"SubTitle": "找口感", "Items":' +
                 '[{ "ItemID": "2", "Name": "椰果奶茶", "Price": "45" },' +
                 '{ "ItemID": "3", "Name": "波霸奶茶", "Price": "40" }]}]},' +
           '{"MenuID": "Menu2", "Items":[{"SubTitle": "找好茶", "Items":' +
                 '[{ "ItemID": "4", "Name": "觀音拿鐵", "Price": "45" },' +
                  '{ "ItemID": "1", "Name": "黃金烏龍", "Price": "40" }]},' +
           '{"SubTitle": "找口感", "Items":' +
                 '[{ "ItemID": "2", "Name": "蜂蜜檸檬", "Price": "45" },' +
                  '{ "ItemID": "5", "Name": "波霸烏龍", "Price": "40" }]}]}]'

var storesJson = '[{"StoreID":"1", "StoreName":"50嵐長春店", "Address":"台北市松山區長春路476號", "Phone":"02-87121710", "Fax":"02-87121710", "MenuID": "Menu1"},' +
             '{"StoreID":"2", "StoreName":"50嵐信陽店", "Address":"台北市中正區信陽街13號261號", "Phone":"02-23755886", "Fax":"02-23755886", "MenuID": "Menu2"},' +
             '{"StoreID":"3", "StoreName":"50嵐吉林路店", "Address":"台北市中山區吉林路185號", "Phone":"02-21001912", "Fax":"02-21001912", "MenuID": "Menu3"},' +
             '{"StoreID":"4", "StoreName":"50嵐南西站前店", "Address":"台北市中山區南京西路12巷3號", "Phone":"02-25673355", "Fax":"02-25673355", "MenuID": "Menu4"},' +
             '{"StoreID":"5", "StoreName":"50嵐西寧南路店", "Address":"台北市萬華區西寧南路48-4號", "Phone":"02-23115937", "Fax":"02-23115937", "MenuID": "Menu5"}]';


var menuJson = '{"MenuID": "Menu1", "Items": [{"SubTitle": "找好茶", "Items":' +
                 '[{ "ItemID": "0", "Name": "茉莉綠茶", "Price": "20" },' +
                  '{ "ItemID": "1", "Name": "阿薩姆紅茶", "Price": "15" },' +
                  '{ "ItemID": "2", "Name": "四季春茶", "Price": "15" },' +
                  '{ "ItemID": "3", "Name": "凍頂烏龍綠", "Price": "15" },' +
                  '{ "ItemID": "4", "Name": "文山清茶", "Price": "20" },' +
                  '{ "ItemID": "5", "Name": "微檸檬綠", "Price": "40" },' +
                  '{ "ItemID": "6", "Name": "蜂蜜綠", "Price": "40" },' +
                  '{ "ItemID": "7", "Name": "8冰綠", "Price": "40" },' +
                  '{ "ItemID": "8", "Name": "養樂多綠", "Price": "40" },' +
                  '{ "ItemID": "9", "Name": "冰淇淋紅茶", "Price": "40" },' +
                  '{ "ItemID": "10", "Name": "鮮柚綠茶", "Price": "40" }]},' +
                '{"SubTitle": "找口感", "Items":' +
                 '[{ "ItemID": "11", "Name": "椰果奶茶", "Price": "45" },' +
                  '{ "ItemID": "12", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "13", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "14", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "15", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "16", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "17", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "18", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "19", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "20", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "21", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "22", "Name": "黃金烏龍", "Price": "40" },' +
                  '{ "ItemID": "23", "Name": "波霸奶茶", "Price": "40" }]}]}'


function getParameterByName(name, url) {
    //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

    if (!url)
        url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);

    if (!results)
        return null;

    if (!results[2])
        return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getLocalStorage(key) {
    var value = undefined;
    if (typeof (Storage) !== "undefined") {
        value = localStorage.getItem(key);
    }
    return value;
}

function setLocalStorage(key, value) {
    if (typeof (Storage) !== "undefined") {
        value = localStorage.setItem(key, value);
    }
}

function getSessionStorage(key) {
    var value = undefined;
    if (typeof (Storage) !== "undefined") {
        value = sessionStorage.getItem(key);
    }
    return value;
}

function setSessionStorage(key, value) {
    if (typeof (Storage) !== "undefined") {
        value = sessionStorage.setItem(key, value);
    }
}

function queryMenu(storeID, onGetMenuSuccess, onGetMenuError) {
    var api = serverURL + "/GetMenuByStoreID";
    var parameter = {
        param: { StoreID: storeID },
        type: "GET",
        success: (args) => { onGetMenuSuccess(args) },
        error: (args) => { onGetMenuError(args) }
    }

    query(api, parameter);
}

function createProduceTable(storeID) {
    var api = serverURL + "/GetMenuByStoreID";
    var parameter = {
        param: { StoreID: storeID },
        type: "GET",
        success: (args) => { onGetMenuSuccess(args) },
        error: (args) => { onGetMenuError(args) }     
    }

    query(api, parameter);
}

function onGetMenuSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        var menu = args.Menu;
        menu.Items = JSON.parse(b64DecodeUnicode(menu.Items));        
        var table = document.getElementById("productTable");

        var tr = table.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = "Name"
        td = tr.insertCell(1);
        td.innerHTML = "Price";

        for (var i = 0; i < menu.Items.length; i++) {
            var num = table.rows.length;
            var tr = table.insertRow(num);
            var subCategory = menu.Items[i];
            td = tr.insertCell(tr.cells.length);
            td.innerHTML = subCategory.SubTitle;
            td.colSpan = 2;
            td.className = "SubTitle";
            for (var j = 0; j < subCategory.Items.length; j++) {
                var num = table.rows.length;
                var tr = table.insertRow(num);
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = subCategory.Items[j].Name;
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = subCategory.Items[j].Price;
            }
        }
    }
    else {
        setWarningMsg(true, "Parameter error!");
    }
}

function onGetMenuError(args) {
    setWarningMsg(true, "Some errors occur");
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function createStoreInfoTable(store) {
    var table = document.getElementById("informationTable");
    for (var propertyName in store) {
        if (propertyName == "StoreID" || propertyName == "MenuID")
            continue;
        var num = table.rows.length;
        var tr = table.insertRow(num);
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = propertyName;
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = store[propertyName];
    }

    return store;
}

function setWarningMsg(visible, msg) {
    var element = document.getElementById("warningMsg");

    if (visible) {
        element.innerHTML = msg;
        element.opacity = 1;
    }
    else {
        element.innerHTML = "";
        element.opacity = 0;
    }
}

function isStringEmpty(value) {
    if (value == null || value == undefined || value == "")
        return true;
    return false;
}

function isDateValid(inputDate) {
    var offset = inputDate.getTimezoneOffset() * 60000 //60 mins * 1000 mini second;
    var utc = inputDate.getTime() + offset;
    var adjustDate = new Date(utc);
    var now = new Date();
    var isValid = adjustDate > now;
    return isValid;
}

function clearChild(elementName) {
    var div = document.getElementById(elementName);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function query(url, o) {
    $.ajax({
        url: url,
        type: o.type,
        data: o.param,
        dataType: "json",
        success: (data) => {
            console.log(data);
            if (typeof o.success === 'function') {
                o.success(data);
            }
        },
        error: (data) => {
            if (typeof o.error === 'function') {
                o.error(data);
            }
        }
    });
}

var IP = "http://10.1.4.133";
//var IP = "http://10.1.4.169";
var port = "8888";
var serverURL = IP + ":" + port;