(function() {
    'use strict';

    angular
        .module('siccApp')
        .directive('indicadorCumple', indicadorCumple);

    function indicadorCumple () {
        var directive = {
            restrict: 'E',
            scope:{
                'cumple':'=',
                'desconocido':'='
            },
            replace:true,
            link: linkFunc,
            template:'<span ng-class="cssClasses"><span class="sr-only">{{cumpleText}}</span></span>'
        };

        return directive;

        function linkFunc (scope, element) {
            
            //var $span = angular.element(element);

            
            scope.$watch('cumple', function(){
                if(scope.cumple===true){
                    scope.cssClasses=['glyphicon', 'glyphicon-ok-sign', 'indicador-cumple'];
                    scope.cumpleText="Cumple";
                    return;
                }
                else{
                    scope.cssClasses=['glyphicon', 'glyphicon-remove-sign', 'indicador-no-cumple'];
                    scope.cumpleText="No cumple";
                }
                
            });

            scope.$watch('desconocido', function(){
                if(scope.desconocido){
                    scope.cssClasses=['glyphicon', 'glyphicon-question-sign', 'indicador-cumple-desconocido'];
                    scope.cumpleText="Desconocido";
                }
            });


            
            

        }
    }
})();
