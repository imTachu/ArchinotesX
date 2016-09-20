(function() {
    'use strict';
    angular
        .module('siccApp')
        .directive('preventDrop', preventDrop);

    function preventDrop () {
        var directive = {
            'scope': false,
            'link': function(scope, element, attrs) {
                element.bind('drop dragover', function (event) {
                    event.preventDefault();
                });
            }
        };

        return directive;
    }
    
})();
