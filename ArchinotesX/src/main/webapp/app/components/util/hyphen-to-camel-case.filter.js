(function() {
    'use strict';

    angular
        .module('siccApp')
        .filter('hyphenToCamelCase', hyphenToCamelCase);

    function hyphenToCamelCase() {
        return hyphenToCamelCaseFilter;

        function hyphenToCamelCaseFilter (input) {
            if (input !== null) {
                input = input.toLowerCase();
            }

            var camelCased = input.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

            return camelCased;
        }
    }
})();
