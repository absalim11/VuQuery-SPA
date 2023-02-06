(function () {
    var vm = new Vue({
        el: '#viewProduct',
        name: 'viewProduct',
        data: {
            productList : {}
        },
        methods: {
            fetchProduct: function () {
                var endpoint = _configVars.api.baseUrl;
                endpoint += 'products';
                const _apiResult = simpleApiCall({
                    'url' : endpoint,
                    'header' : { 'Content-Type': 'application/json' },
                    'data' : {},
                    'method' : 'GET'
                });
            }
        },
        mounted: function () {
            this.fetchProduct();
        },
        created: function () {
            
        },
    });
})();