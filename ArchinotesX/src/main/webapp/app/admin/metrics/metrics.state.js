(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jhi-metrics', {
            parent: 'admin',
            url: '/metrics',
            data: {
                authorities: ['ROLE_OPERADOR1','ROLE_OPERADOR2','ROLE_ADMIN', 'ROLE_SUPERVISOR', 'ROLE_INTERVENTOR', 'ROLE_CONSULTA_INTERVENTOR' ,'ROLE_CONSULTA_CONCESION'],
                pageTitle: 'Application Metrics'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/metrics/metrics.html',
                    controller: 'JhiMetricsMonitoringController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
