(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-inspeccion-drenajes', {
            parent: 'reportes',
            url: '/reporte-inspeccion-drenajes',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de drenajes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e10-inspeccion-drenajes/reporte-inspeccion-drenajes.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionDrenajesReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e10_';
                }
            }
        });
    }
})();
