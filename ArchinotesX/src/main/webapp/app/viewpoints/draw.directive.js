(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .directive('drawline', drawline);

    function drawline() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          msId: '@',
          dsId: '@'
        },
        replace: true,
        link: function (scope, element, attributes) {
          scope.$watch( function(scope) {
              $('#container').line($('#ds-'+scope.dsId), $('#ms-'+scope.msId), {color:'black', stroke:2, zindex:500})
          } );

        }
      }
    }
})();
