/*
 * Routing initialized
 * =============================================================
 * */
(function($) {
	var routes = {},
    	defaultRoute = '/404';

		routes['/404'] = {
		  	url: '#/404',
		  	templateUrl: 'app/error/404.html?v='+Math.random(),
      		cache : false,
		};
 		routes['/login'] = {
 		  	url: '#/auth/login',
 		  	templateUrl: 'app/auth/auth.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard]
 		};		
 		routes['/logout'] = {
 		  	url: '#/auth/logout',
 		  	templateUrl: 'app/auth/auth.html?v='+Math.random(),
      		cache : false,
 		};		
 		routes['/unauthorized'] = {
 		  	url: '#/error/unauthorized',
 		  	templateUrl: 'app/error/unauthorized.html?v='+Math.random(),
      		cache : false,
 		};
 		
 		routes['/'] = {
 		  	url: '#/',
 		  	templateUrl: 'app/home/home.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard]
 		};		
 		routes['/home'] = {
 		  	url: '#/home',
 		  	templateUrl: 'app/home/home.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard]
 		};		
 		routes['/about'] = {
 		  	url: '#/about',
 		  	templateUrl: 'app/about/about.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard],
 		};		
 		routes['/contact'] = {
 		  	url: '#/contact',
 		  	templateUrl: 'app/contact/contact.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard]
 		};
 		routes['/product'] = {
 		  	url: '#/product',
 		  	templateUrl: 'app/product/product.html?v='+Math.random(),
      		cache : false,
      		resolve : [authGuard]
 		};		

  

  $.router.setData(routes).setDefault(defaultRoute);

  $.when($.ready).then(function() {
    
    $.router.run('.my-app', '/login');

    // console.log('render awal apps');

  });

})(jQuery);

/**
 * ========================================================================
 * */


/*global variable*/
var _configVars = {};
var _componentDir = './components/';
var _configDir = './config/';
var _apiResult = {};


/*event yang bisa digunakan*/
$(document).ready(function(){
	initialize();
	// console.log('render dokumen');
	
})

$.router.onViewChange( function(e, viewRoute, route, params){ 
	// console.log('render perubahan view');
	
});

$.router.onRouteMatched( function(e, route, params){
	// console.log('render perubahan url');
});

/*event paling akhir*/
$.router.onRouteChanged( function(e, route, params){
	// console.log('render perubahan url final');
	renderViewComponent();
	// console.log(_configVars);
});


/**
 * block of base function
 * ======================================================================
 * ======================================================================
 * */

function renderComponent(components) {
	$.each(components,function(i,scripts){
	    $.getScript(_componentDir+scripts+'.js', function() {
	        // console.log(scripts+'.js components was load successfuly');
	    });
	})
}

function renderViewComponent(components={
	   '.my-menu' : 'views/menu.html',
	   '.my-footer' : 'views/footer.html',
	   '.pageheader' : 'views/breadcrumb.html'
	  }) {

	var logedIn = localStorage.getItem('login');
	var switchElement = 0;
	if (logedIn == 'true') {
        var curUrl = getCurrentURL();
        if (curUrl == '/auth/login') {
            switchElement = 0;
        }else{
            switchElement = 1;
        }   
    }else{
        switchElement = 0;
    }

    if (switchElement==1) {
    	$('.onRender').show();
    	$.each(components,function(selector,view){
			var target = _componentDir+view;
		  	$.get(target,function(response){
		    	$(selector ).html(response);
		    	console.log('element ('+selector+') was load successfuly');
		    	if (selector == '.pageheader') {generateCrumb()}
		  	});
		});
    }else{
    	$('.onRender').hide();
    }
}

function generateCrumb(){
	var currentPage = getCurrentURL();
	var rm = currentPage[0];
	currentPage = currentPage.replace(rm,'');
	$('.currentPage').text(currentPage);
	$('.currentPage').css('textTransform', 'capitalize');

	// console.log(currentPage.replace(''));
}

function authGuard(){
	var logedIn = localStorage.getItem('login');
	var defer = $.Deferred();
	var curUrl = getCurrentURL();
	if (logedIn == 'true') {
		defer.resolve();
		if (curUrl == '/auth/login') {
			$.router.go('/home');
		}
	}else{
		defer.reject();
		$.router.go('/login');
	}
}

function getCurrentURL() {
	var originUrl = window.location.href
	var objUrl = originUrl.split("#");
	
	if (objUrl[1] === undefined || objUrl[1] == '/') {
		/*assume its /home*/
		return '/home';
	}else{
		return objUrl[1];
	}
}


function routerGo(menu='/'){
	var originUrl = window.location.href
  	var objUrl = originUrl.split("#");
  	var baseUrl = objUrl[0];
  	window.location.href = baseUrl+'#'+menu; /*redirecting*/
}

function initialize(){
  	localStorage.setItem('authorizedUser',{});
  	renderComponent(['roleGuard','dateFormater','globalValidation']);
  	loadConfiguration();
}

function loadConfiguration(configs={
	'api' : 'api.json'
	}){
	
	$.each(configs,function(key,filename){
		var target = _configDir+filename;
		var keyname = key;
		
		$.get(target,function(response){
			var objRsp = $.parseJSON(response);
			_configVars[key] = objRsp;
		});
	});
	
}

function simpleApiCall(configs) {
	var _apiResult = null;
	var endpoint = configs.url;
	var parseData = configs.data;
	var header = configs.header;
	var method = configs.method;
	var contentType = (configs.dataType)?configs.dataType:'json';
	
	return $.ajax({
	    url: endpoint,
	    type: method,
	    data: parseData,
	    headers: header,
	    dataType: contentType,
	    async: false
    });
}


