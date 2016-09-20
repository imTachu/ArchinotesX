(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(httpConfig);

    httpConfig.$inject = ['$urlRouterProvider', '$httpProvider', 'httpRequestInterceptorCacheBusterProvider', '$urlMatcherFactoryProvider'];

    function httpConfig($urlRouterProvider, $httpProvider, httpRequestInterceptorCacheBusterProvider, $urlMatcherFactoryProvider) {
        
        //Cache everything except rest api requests
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

        //http://stackoverflow.com/questions/406230/regular-expression-to-match-line-that-doesnt-contain-a-word
        //Cache except api/tipo-senal api/estrcutura 
        //httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api(((?!tipo-senal)+(?!estructura-)+.)?)*$/, /.*protected.*/], true);
        //   .*api(((?!tipo-senal)+(?!otro)+.)?)*$

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('errorHandlerInterceptor');
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('notificationInterceptor');
        // jhipster-needle-angularjs-add-interceptor JHipster will add new application http interceptor here

        $urlMatcherFactoryProvider.type('boolean', {
            name : 'boolean',
            decode: function(val) { return val === true || val === 'true'; },
            encode: function(val) { return val ? 1 : 0; },
            equals: function(a, b) { return this.is(a) && a === b; },
            is: function(val) { return [true,false,0,1].indexOf(val) >= 0; },
            pattern: /bool|true|0|1/
        });
    }
})();
