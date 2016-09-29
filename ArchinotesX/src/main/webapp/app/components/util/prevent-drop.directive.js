(function() {
    'use strict';
    angular
        .module('archinotesxApp')
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
