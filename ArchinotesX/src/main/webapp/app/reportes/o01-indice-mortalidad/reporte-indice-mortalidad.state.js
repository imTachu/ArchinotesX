(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-indice-mortalidad', {
            parent: 'reportes',
            url: '/reporte-indice-mortalidad',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Índice de mortalidad'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/o01-indice-mortalidad/reporte-indice-mortalidad.html',
                    controller: 'IndiceMortalidadReporteController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'IndiceMortalidadReporteService',
                csvNamePrefix: function() {
                    return 'reporte_o1';
                }
            }
        });
    }
})();
