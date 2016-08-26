var PersonalCard = Vue.extend({
    props: {
        name: String,
        title: String, 
        description: String,
        mail: String,
        imgpath: {
            type: String,
            default: "../Images/Jim.png"
        }
    },
    template: "#personalcardtemplate",
    replace: true
})

Vue.component("personalcard", PersonalCard)

new Vue({
    el: '#personalDiv'
})

new Vue({
    el: '#personalDiv2'
})
