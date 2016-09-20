(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tiempo-atencion-accidentes', {
            parent: 'reportes',
            url: '/tiempo-atencion-accidentes',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Tiempo atención accidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/o05-tiempo-atencion-accidentes/reporte-tiempo-atencion-accidentes.html',
                    controller: 'TiempoAtencionAccidentesController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
