(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('viewpoints', {
                parent: 'entity',
                url: '/viewpoints',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'View Points'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/viewpoints/viewpoints.html',
                        controller: 'ViewpointsController',
                        controllerAs: 'vm'
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                }
            })
    }

})();
