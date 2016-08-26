var StoreInfoTable = Vue.extend({
    props: {
        source: Object
    },
    template: "#storeinfotemplate",
    replace: true
})

Vue.component("storeinfotable", StoreInfoTable)

var vm = new Vue({
    el: '#storeinfotableDiv',
    data: {
        storeitem: undefined
    },
    methods: {
        filterStoreInfo: function (store) {
            this.storeitem = {
                StoreName: store.StoreName,
                Address: store.Address,
                Phone: store.Phone,
                Fax: store.Fax
            };
        }
    }
})
