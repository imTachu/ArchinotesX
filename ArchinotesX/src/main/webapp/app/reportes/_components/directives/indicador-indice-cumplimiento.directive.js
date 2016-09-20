(function() {
    'use strict';

    angular
        .module('siccApp')
        .directive('indicadorIndiceCumplimiento', indicadorIndiceCumplimiento);

    indicadorIndiceCumplimiento.$inject = ['$compile'];

    function indicadorIndiceCumplimiento($compile) {
        var directive = {
            restrict: 'EA',
            scope: {
                indicator: '=indicadorIndiceCumplimiento'
            },
            link: linkFunc,
            templateUrl: 'app/reportes/_components/directives/datos-reporte-indice-cumplimiento.html'
        };

        function linkFunc(scope, element, attrs) {

            scope.loading = true;
            scope.error = false;

            var indicator = scope.indicator;

            indicator.then(
                function(reportData, headers, reportModel) {
                    scope.loading = false;
                    scope.reportData = reportData;
                    scope.reportModel = reportModel;
                    //  refreshUI();
                },
                function() {
                    scope.loading = false;
                    scope.error = true;
                });


            // setInterval(function() {
            //     scope.$apply(function() {
            //         //var template = '';
            //         var content = $compile()(scope);
            //         element.append(content);
            //     });

            //     scope.loading = false;

            // }, 1000);
        }

        // element.find('.indicador-loading').toggleClass('hide');
        // element.find('.indicador-cumplimiento').toggleClass('hide');

        return directive;
    }
})();
