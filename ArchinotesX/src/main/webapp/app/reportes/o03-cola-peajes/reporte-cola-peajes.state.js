(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-cola-peajes', {
            parent: 'reportes',
            url: '/reporte-cola-peajes',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Cola de peajes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/o03-cola-peajes/reporte-cola-peajes.html',
                    controller: 'ReporteColaPeajesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'ColaPeajesReporteService',
                csvNamePrefix: function() {
                    return 'reporte_o3';
                }
            }
        });
    }
})();
