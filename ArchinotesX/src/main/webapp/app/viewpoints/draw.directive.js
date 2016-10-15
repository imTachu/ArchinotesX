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
          element1: '@',
          element2: '@'
        },
        replace: true,
        link: function (scope, element, attributes) {
          scope.$watch( function(scope) {
            alert(scope.element2)
              // $('#'+scope.container).line($('#'+scope.element1), $('#'+scope.element2), {color:'black', stroke:2, zindex:500})
          } );

        }
      }
    }


})();
