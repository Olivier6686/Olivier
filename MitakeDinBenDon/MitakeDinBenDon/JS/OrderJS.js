var Modal, MapDiv;

function getOrderItemByUserName() {
    var orderList = getSessionStorage("OrderList");

    if (isStringEmpty(orderList)) {
        setWarningMsg(true, "You have no ongoing orders");
    }
    else {
        setWarningMsg(false, "");

        var GUIDs = JSON.parse(orderList).map(function (item) {
            return item.OrderFormID;
        }).join(",");

        var api = ServerURL + "/GetOrderFormsByID";
        var parameter = {
            param: { OrderFormIDs: GUIDs },
            type: "GET",
            success: (args) => { onGetOrderFormSuccess(args) },
            error: (args) => { onGetOrderFormError(args) }
        }

        query(api, parameter);
    }
}

function onGetOrderFormSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        var orders = args.Items;

        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            generateOngoingItem(order.Title, order.Description, order.ExpiredTime, order.OrderFormID);
            //for (var j = 0; j < order.Attendance.length; j++) {
            //    if (order.Attendance[j].UserName == username) {
            //        var name = getItemNameByID(menus, order.Attendance[j].ItemID);
            //       generateOngoingItem(order.Title, name, order.Attendance[j].Description);
            //    }
            //}
        }

        setOngoingAnimation();
    }
    else {
        setWarningMsg(true, args.exception.message);
    }
}

function onGetOrderFormError(args) {
    setWarningMsg(true, "Some errors occur");
}

function setOngoingAnimation() {
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
}

function getItemNameByID(source, itemID) {
    for (var i = 0; i < source.length; i++) {
        var menu = source[i];
        for (var j = 0; j < menu.Items.length; j++) {
            var subCategory = menu.Items[j];
            for (var k = 0; k < subCategory.Items.length; k++) {
                var item = subCategory.Items[k];
                if (item.ItemID == itemID)
                    return item.Name;
            }
        }
    }
}

function generateOngoingItem(title, item, detail, orderFormID) {
    var div = document.getElementById("ongoingSection"); 
    var btn = document.createElement("button");
    btn.innerHTML = title;
    btn.className = "accordion";
    btn.type = "button";

    var d = document.createElement("div");
    d.className = "panel";

    var table = document.createElement("table");
    var tr = table.insertRow(0);
    td1 = tr.insertCell(0);
    td1.className = "ongoingTable"
    td1.style.width = "80%";
    td1.innerHTML = item + " - " + detail;

    var statisticBtn = document.createElement("button");
    statisticBtn.innerHTML = "Statistic";
    statisticBtn.className = "input";
    statisticBtn.style.width = "100%";
    statisticBtn.name = orderFormID;
    statisticBtn.onclick = onStatisticClick;

    td2 = tr.insertCell(1);
    td2.className = "ongoingTable"
    td2.style.width = "20%";
    td2.appendChild(statisticBtn)
    d.appendChild(table);

    div.appendChild(btn);
    div.appendChild(d);
}

function onKeyPress() {
    if (event.keyCode == 13) {
        event.preventDefault();
        clearChild("searchSection");
        var keywords = $("#search_input").val();
        searchStores(keywords);
    }
}

function searchStores(keyword) {
    var api = ServerURL + "/GetStoresByName";
    var parameter = {
        param: { Name: keyword },
        type: "GET",
        success: (args) => { onSearchSuccess(args) },
        error: (args) => { onSearchError(args) }
    }

    query(api, parameter);
}

function onSearchSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        generateSearchItem(args.Stores);
    }
    else {
        setWarningMsg(true, "There is no item matched!");
    }
}

function onSearchError(args) {
    setWarningMsg(true, "Some errors occur");
}

function generateSearchItem(stores) {
    var div = document.getElementById("searchSection");
    for (var i = 0; i < stores.length; i++) {
        var element = document.createElement("button");
        element.data = JSON.stringify(stores[i]); //To storage store information
        element.innerHTML = stores[i].StoreName;
        element.onclick = onChipClick;
        element.className = "chip";
        element.type = "button";
        div.appendChild(element);
    }
}

function onChipClick() {
    var btn = event.srcElement;
    if (!isStringEmpty(btn.data)) {
        var info = JSON.parse(btn.data);
        $("#confirmBtn").val(info.StoreID);
        showMenuModal(info);
    }
}

function showMenuModal(store) {
    $("#modalTitle").html(store.StoreName);
    $("#modalAddress").html(store.Address);
    createProduceTable(store.StoreID);
    Modal = document.getElementById("modalForm");
    Modal.style.display = "block";
    $("#outerBody").css("overflowY", "hidden");
}

function onMenuCancelClick() {
    Modal.style.display = "none";   
    $("#outerBody").css("overflowY", "scroll");
    clearChild("productTable");
}

window.onclick = function (event) {
    if (event.target == Modal) {
        Modal.style.display = "none";
        $("#outerBody").css("overflowY", "scroll");
        clearChild("productTable");
    }
}

function onStatisticClick(e) {
    var btn = e.target;
    var location = "OrderConfirmPage.html?OrderFormID=" + btn.name;
    window.location.assign(location);
}

function openTab(event, methodName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(methodName).style.display = "block";
    event.currentTarget.className += " active";

    if (methodName == "mapDiv")
        initailMap();
}

function initailMap() {
    if (navigator.geolocation) {
        if (MapDiv == undefined) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log("Get current location success: " + position.coords.latitude + " @ " + position.coords.longitude);
                setCenterMap(latLng);
            }, function (error) {
                var latLng = new google.maps.LatLng(25.055297, 121.5272828);
                console.log("Get current location fail: " + "25.055297 @ 121.5272828");
                setCenterMap(latLng);
            })
        }
    }
}

function setCenterMap(LatLng) {
    var mapCanvas = document.getElementById("map");
    var mapOptions = { center: LatLng, zoom: 14 }
    MapDiv = new google.maps.Map(mapCanvas, mapOptions);
    getStores();
}

function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            return position;
        });
    } else {
        var position = new google.maps.position;
        position.lat = 25.055297;
        position.lng = 121.5272828;
    }
}

function showNearbyStores(storeInfos) {
    var geocoder = new google.maps.Geocoder();

    for (var i = 0; i < storeInfos.length; i++) {
        var store = storeInfos[i];
        addMarker(store, geocoder);
    }
}

function addMarker(store, geocoder) {
    geocoder.geocode({ "address": store.Address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            var storeLatlng = new google.maps.LatLng(location.lat(), location.lng());
            var marker = new google.maps.Marker({ position: storeLatlng, title: store["StoreName"] });
            marker.data = store;
            marker.setMap(MapDiv);
            google.maps.event.addListener(marker, "click", function () {
                var info = marker.data;
                $("#confirmBtn").val(info.StoreID);
                showMenuModal(info);
            });
        }
        else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            console.log(status);
            setTimeout(function () { addMarker(store, geocoder); }, (3000));
        }
    });
}

function getStores() {
    var api = ServerURL + "/GetStores";
    var parameter = {
        param: "",
        type: "GET",
        success: (args) => { onGetStoresSuccess(args) },
        error: (args) => { onGetStoresError(args) }
    }

    query(api, parameter);
}

function onGetStoresSuccess(args) {
    if (args.IsSucceed) {
        setWarningMsg(false, "");
        showNearbyStores(args.Stores);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onGetStoresError(args) {
    setWarningMsg(true, "Some errors occur");
}
