(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-ocupacion-carriles', {
            parent: 'reportes',
            url: '/reporte-ocupacion-carriles',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Ocupación carriles'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/o02-ocupacion-carriles/reporte-ocupacion-carriles.html',
                    controller: 'ReporteOcupacionCarrilesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'OcupacionCarrilesReporteService',
                csvNamePrefix: function() {
                    return 'reporte_o2';
                }
            }
        });
    }
})();
