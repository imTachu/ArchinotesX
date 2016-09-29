(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-incidente', {
            parent: 'entity',
            url: '/tipo-incidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN'],
                pageTitle: 'TipoIncidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-incidente/tipo-incidentes.html',
                    controller: 'TipoIncidenteController',
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
        .state('tipo-incidente-detail', {
            parent: 'entity',
            url: '/tipo-incidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN'],
                pageTitle: 'TipoIncidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-incidente/tipo-incidente-detail.html',
                    controller: 'TipoIncidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoIncidente', function($stateParams, TipoIncidente) {
                    return TipoIncidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-incidente.new', {
            parent: 'tipo-incidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-incidente/tipo-incidente-dialog.html',
                    controller: 'TipoIncidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipoIncidente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-incidente', null, { reload: true });
                }, function() {
                    $state.go('tipo-incidente');
                });
            }]
        })
        .state('tipo-incidente.edit', {
            parent: 'tipo-incidente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-incidente/tipo-incidente-dialog.html',
                    controller: 'TipoIncidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoIncidente', function(TipoIncidente) {
                            return TipoIncidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-incidente.delete', {
            parent: 'tipo-incidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-incidente/tipo-incidente-delete-dialog.html',
                    controller: 'TipoIncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoIncidente', function(TipoIncidente) {
                            return TipoIncidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
