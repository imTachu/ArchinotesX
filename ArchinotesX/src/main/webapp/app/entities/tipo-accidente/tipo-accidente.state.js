(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-accidente', {
            parent: 'entity',
            url: '/tipo-accidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN'],
                pageTitle: 'TipoAccidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-accidente/tipo-accidentes.html',
                    controller: 'TipoAccidenteController',
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
        .state('tipo-accidente-detail', {
            parent: 'entity',
            url: '/tipo-accidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN'],
                pageTitle: 'TipoAccidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-accidente/tipo-accidente-detail.html',
                    controller: 'TipoAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoAccidente', function($stateParams, TipoAccidente) {
                    return TipoAccidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-accidente.new', {
            parent: 'tipo-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-accidente/tipo-accidente-dialog.html',
                    controller: 'TipoAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipoAccidente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-accidente', null, { reload: true });
                }, function() {
                    $state.go('tipo-accidente');
                });
            }]
        })
        .state('tipo-accidente.edit', {
            parent: 'tipo-accidente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-accidente/tipo-accidente-dialog.html',
                    controller: 'TipoAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoAccidente', function(TipoAccidente) {
                            return TipoAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-accidente.delete', {
            parent: 'tipo-accidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-accidente/tipo-accidente-delete-dialog.html',
                    controller: 'TipoAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoAccidente', function(TipoAccidente) {
                            return TipoAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
