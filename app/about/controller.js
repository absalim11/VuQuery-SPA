var AboutController = {};
(function () {
    var AboutController = new Vue({
        el: '#viewAbout',
        name: 'viewAbout',
        data: {
            
        },
        methods: {
            sample: function () {
                // alert('contoh method threads');
                this.subSample();
            },

            subSample: function(){
                console.log('ini sub method yg diakses dari sample()');
                // alert('contoh method threads');
                InaFormatDate();
            }
        },
        mounted: function () {
        },
        created: function () {},
    });
})();