(function() {
    'use strict';

    angular
        .module('siccApp')
        .filter('hyphenToUnderscore', hyphenToUnderscore);

    function hyphenToUnderscore() {
        return hyphenToUnderscoreFilter;

        function hyphenToUnderscoreFilter (input) {
            if (input !== null) {
                input = input.toLowerCase();
            }

            var underscored = input.replace(/-/g, '_');

            return underscored;
        }
    }
})();
