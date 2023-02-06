(function () {
    var vm = new Vue({
        el: '#viewLogin',
        name: 'viewLogin',
        data: {
            username : 'kminchelle',
            password : '0lelplR'
        },
        methods: {
            login: function () {
                var endpoint = _configVars.api.baseUrl;
                endpoint += 'auth/login';
                const _apiResult = simpleApiCall({
                    'url' : endpoint,
                    'header' : { 'Content-Type': 'application/json' },
                    'data' : JSON.stringify({
                        username: 'kminchelle',
                        password: '0lelplR',
                        expiresInMins: 60, // optional
                    }),
                    'method' : 'POST'
                });
                if (_apiResult.status == 200) {
                    console.log(_apiResult.responseJSON);
                    if (!$.isEmptyObject(_apiResult.responseJSON)) {
                        /*login success*/
                        var users = _apiResult.responseJSON;
                        localStorage.setItem('login',true);
                        localStorage.setItem('authorizedUser',users);
                        $.router.go('/home');
                    }    
                }
                
            },

            logout: function () {
                localStorage.setItem('login',false);
                $.router.go('/login');
            }
        },
        mounted: function () {
            var curUrl = getCurrentURL();
            if (curUrl == '/auth/logout') {
                this.logout();
            }
        },
        created: function () {
            
        },
    });
})();