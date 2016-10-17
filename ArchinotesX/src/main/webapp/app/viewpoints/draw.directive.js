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
            if( $('#'+scope.element1).height() >= 90 && $('#'+scope.element2).height() >= 66 ){
                $('#'+scope.container).line($('#'+scope.element1), $('#'+scope.element2), {color:'black', stroke:2, zindex:500})
              }
          } );

        }
      }
    }


})();
