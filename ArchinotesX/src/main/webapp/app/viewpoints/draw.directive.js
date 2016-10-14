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
          container: '@',
          msId: '@',
          dsId: '@'
        },
        replace: true,
        link: function (scope, element, attributes) {
          scope.$watch( function(scope) {
              $('#'+scope.container).line($('#'+scope.dsId), $('#'+scope.msId), {color:'black', stroke:2, zindex:500})
          } );

        }
      }
    }


})();
