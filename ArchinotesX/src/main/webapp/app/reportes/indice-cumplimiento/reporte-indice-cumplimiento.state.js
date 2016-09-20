(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('reporte-indice-cumplimiento', {
            parent: 'reportes',
            url: '/reporte-indice-cumplimiento',
            data: {
                authorities: ['ROLE_OPERADOR1','ROLE_OPERADOR2','ROLE_ADMIN', 'ROLE_SUPERVISOR', 'ROLE_INTERVENTOR', 'ROLE_CONSULTA_INTERVENTOR' ,'ROLE_CONSULTA_CONCESION'],
                pageTitle: 'Reporte - Índice de cumplimiento'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/indice-cumplimiento/reporte-indice-cumplimiento.html',
                    controller: 'IndiceCumplimientoController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
