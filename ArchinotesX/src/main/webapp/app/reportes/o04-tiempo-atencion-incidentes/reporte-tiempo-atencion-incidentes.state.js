(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tiempo-atencion-incidentes', {
            parent: 'reportes',
            url: '/tiempo-atencion-incidentes',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Reporte - Tiempo atención incidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/reportes/o04-tiempo-atencion-incidentes/reporte-tiempo-atencion-incidentes.html',
                    controller: 'TiempoAtencionIncidentesController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
