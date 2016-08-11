var StoreID;

function queryStoreInfo() {
    var url = window.location.search;
    StoreID = getParameterByName("StoreID", url);
    getStoreByID(StoreID, onGetStoreByIDSuccess, onGetStoreByIDError);
}

function onGetStoreByIDSuccess(args) {
    if (args.IsSucceed) {
        createProduceTable(StoreID);
        createStoreInfoTable(args.Store);
        showMap(args.Store["StoreName"], args.Store["Address"]);
    }
    else {
        setWarningMsg(true, "User name or Password failed");
    }
}

function onGetStoreByIDError(args) {
    setWarningMsg(true, "Some errors occur");
}

function test() {
    var storeInfos = JSON.parse(storesJson);
    var s1 = storeInfos[0];
    var s2 = storeInfos[1];
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": s1["Address"] }, function (results, status) {
        var location = results[0].geometry.location;
        var mapCanvas = document.getElementById("map");
        var storeLatlng = new google.maps.LatLng(location.lat(), location.lng());
        var mapOptions = { center: storeLatlng, zoom: 16 }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        //geocoder.geocode({ "address": s2["Address"] }, function (results, status) {
        //    var location2 = results[0].geometry.location;            
        //    var storeLatlng2 = new google.maps.LatLng(location2.lat(), location2.lng());
        //    var mapOptions = { center: storeLatlng2, zoom: 16 }

        //    var ss = google.maps.geometry.spherical.computeDistanceBetween(location, location2);
        //});
    });
}

function showMap(name, address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": address }, function (results, status) {
        var location = results[0].geometry.location;
        var mapCanvas = document.getElementById("map");
        var storeLatlng = new google.maps.LatLng(location.lat(), location.lng());
        var mapOptions = { center: storeLatlng, zoom: 16 }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({ position: storeLatlng, title: name });
        marker.setMap(map);
    });
}

function onConfirmClick() {
    setWarningMsg(false, "");
    var title = $("#titleInput").val();
    var des = $("#desInput").val();
    var datetime = document.getElementById("expiredTimeInput");
    var time = datetime.value;

    if (isStringEmpty(title) || isStringEmpty(des) || isStringEmpty(time)) {
        setWarningMsg(true, "Please fill title, description or expired time");
        return;
    }

    var inputDate = new Date(time);
    var isValid = isDateValid(inputDate);

    if (!isValid) {
        setWarningMsg(true, "Please select a valid date");
        return;
    }

    var owner = getSessionStorage("UserName");

    if (isStringEmpty(owner)) {
        setWarningMsg(true, "Parameter error");
        return;
    }

    var normalizeTime = time.replace("T", " ");
    var api = ServerURL + "/EstablishOrder";
    var parameter = {
        param: { StoreID: StoreID, Owner: owner, Title: title, Description: des, ExpiredTime: normalizeTime, Attendance: "" },
        type: "POST",
        success: (args) => { onCreateSuccess(args) },
        error: (args) => { onCreateError(args) }
    }

    query(api, parameter);
}

function onCreateSuccess(args) {
    if (args.IsSucceed) {
        $("#modalDiv").css("display", "block");
        updateOrderList(args.OrderForm);
    }
    else {
        setWarningMsg(true, "Parameter error");
    }
}

function onCreateError(args) {
    setWarningMsg(true, "Some errors occur");
}

function onHomeClick() {
    window.location.assign("OrderPage.html");
}

function updateOrderList(GUID) {
    var guid = { OrderFormID: GUID };
    var orderList = getSessionStorage("OrderList");

    var list;
    if (isStringEmpty(orderList)) {
        guid = [guid];
        list = JSON.stringify(guid);
    }
    else {
        list = JSON.parse(orderList);
        list.push(guid);
        list = JSON.stringify(list);
    }

    setSessionStorage("OrderList", list);
}