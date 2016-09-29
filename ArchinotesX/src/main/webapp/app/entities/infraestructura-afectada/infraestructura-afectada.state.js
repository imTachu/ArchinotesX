(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('infraestructura-afectada', {
            parent: 'entity',
            url: '/infraestructura-afectada?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'InfraestructuraAfectadas'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/infraestructura-afectada/infraestructura-afectadas.html',
                    controller: 'InfraestructuraAfectadaController',
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
        .state('infraestructura-afectada-detail', {
            parent: 'entity',
            url: '/infraestructura-afectada/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'InfraestructuraAfectada'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/infraestructura-afectada/infraestructura-afectada-detail.html',
                    controller: 'InfraestructuraAfectadaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'InfraestructuraAfectada', function($stateParams, InfraestructuraAfectada) {
                    return InfraestructuraAfectada.get({id : $stateParams.id});
                }]
            }
        })
        .state('infraestructura-afectada.new', {
            parent: 'infraestructura-afectada',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/infraestructura-afectada/infraestructura-afectada-dialog.html',
                    controller: 'InfraestructuraAfectadaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                infraestructuraAfectada: null,
                                tipoInfraestructura: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('infraestructura-afectada', null, { reload: true });
                }, function() {
                    $state.go('infraestructura-afectada');
                });
            }]
        })
        .state('infraestructura-afectada.edit', {
            parent: 'infraestructura-afectada',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/infraestructura-afectada/infraestructura-afectada-dialog.html',
                    controller: 'InfraestructuraAfectadaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['InfraestructuraAfectada', function(InfraestructuraAfectada) {
                            return InfraestructuraAfectada.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('infraestructura-afectada', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('infraestructura-afectada.delete', {
            parent: 'infraestructura-afectada',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/infraestructura-afectada/infraestructura-afectada-delete-dialog.html',
                    controller: 'InfraestructuraAfectadaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['InfraestructuraAfectada', function(InfraestructuraAfectada) {
                            return InfraestructuraAfectada.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('infraestructura-afectada', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
