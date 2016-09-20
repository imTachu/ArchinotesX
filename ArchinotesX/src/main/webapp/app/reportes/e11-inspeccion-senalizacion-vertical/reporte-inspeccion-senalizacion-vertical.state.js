(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-senalizacion-vertical', {
            parent: 'reportes',
            url: '/reporte-senalizacion-vertical',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Inspección de señalización vertical'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/e11-inspeccion-senalizacion-vertical/reporte-inspeccion-senalizacion-vertical.html',
                    controller: 'ReportesMantenimientoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                service: 'InspeccionSenalizacionVerticalReporteService',
                csvNamePrefix: function() {
                    return 'reporte_e11_';
                }
            }
        });
    }
})();
