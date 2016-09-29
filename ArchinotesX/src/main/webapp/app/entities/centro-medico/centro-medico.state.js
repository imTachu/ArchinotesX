(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('centro-medico', {
            parent: 'entity',
            url: '/centro-medico?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'CentroMedicos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/centro-medico/centro-medicos.html',
                    controller: 'CentroMedicoController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null,
                size: {
                    value: paginationConstants.itemsPerPage.toString(),
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search,
                        size: parseInt($stateParams.size)
                    };
                }]
            }
        })
        .state('centro-medico-detail', {
            parent: 'entity',
            url: '/centro-medico/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'CentroMedico'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/centro-medico/centro-medico-detail.html',
                    controller: 'CentroMedicoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'CentroMedico', function($stateParams, CentroMedico) {
                    return CentroMedico.get({id : $stateParams.id});
                }]
            }
        })
        .state('centro-medico.new', {
            parent: 'centro-medico',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/centro-medico/centro-medico-dialog.html',
                    controller: 'CentroMedicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombreCentroMedico: null,
                                direccionCentroMedico: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('centro-medico', null, { reload: true });
                }, function() {
                    $state.go('centro-medico');
                });
            }]
        })
        .state('centro-medico.edit', {
            parent: 'centro-medico',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/centro-medico/centro-medico-dialog.html',
                    controller: 'CentroMedicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CentroMedico', function(CentroMedico) {
                            return CentroMedico.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('centro-medico', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('centro-medico.delete', {
            parent: 'centro-medico',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/centro-medico/centro-medico-delete-dialog.html',
                    controller: 'CentroMedicoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CentroMedico', function(CentroMedico) {
                            return CentroMedico.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('centro-medico', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
