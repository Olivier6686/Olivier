var PersonalCard = Vue.extend({
    props: ["name", "title", "description", "mail"],
    template: "#personalcardtemplate",
    replace: true
})

// 注册
Vue.component("personalcard", PersonalCard)

// 创建根实例
new Vue({
    el: '#personalDiv'
})