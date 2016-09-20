(function() {
    'use strict';
    angular
        .module('siccApp')
        .factory('EntityListener', EntityListener);

    //EntityListener.$inject = [];

    function EntityListener () {
        function makeListener(){
            var _callback=function(){};       

            function _dispatch(){
                _callback.apply(this,arguments);
            }

            function _attach(callback){
                if(angular.isFunction(callback))
                    _callback=callback;
            }

            return {
                attach:_attach,
                dispatch:_dispatch
            };
        }
        return {
            make:makeListener
        };
    }
})();
