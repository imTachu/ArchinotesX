(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-vehiculo-apoyo', {
            parent: 'entity',
            url: '/tipo-vehiculo-apoyo?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoVehiculoApoyos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-vehiculo-apoyo/tipo-vehiculo-apoyos.html',
                    controller: 'TipoVehiculoApoyoController',
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
        .state('tipo-vehiculo-apoyo-detail', {
            parent: 'entity',
            url: '/tipo-vehiculo-apoyo/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoVehiculoApoyo'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-vehiculo-apoyo/tipo-vehiculo-apoyo-detail.html',
                    controller: 'TipoVehiculoApoyoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoVehiculoApoyo', function($stateParams, TipoVehiculoApoyo) {
                    return TipoVehiculoApoyo.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-vehiculo-apoyo.new', {
            parent: 'tipo-vehiculo-apoyo',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-apoyo/tipo-vehiculo-apoyo-dialog.html',
                    controller: 'TipoVehiculoApoyoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipoVehiculo: null,
                                clasificacion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-vehiculo-apoyo', null, { reload: true });
                }, function() {
                    $state.go('tipo-vehiculo-apoyo');
                });
            }]
        })
        .state('tipo-vehiculo-apoyo.edit', {
            parent: 'tipo-vehiculo-apoyo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-apoyo/tipo-vehiculo-apoyo-dialog.html',
                    controller: 'TipoVehiculoApoyoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoVehiculoApoyo', function(TipoVehiculoApoyo) {
                            return TipoVehiculoApoyo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-vehiculo-apoyo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-vehiculo-apoyo.delete', {
            parent: 'tipo-vehiculo-apoyo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-apoyo/tipo-vehiculo-apoyo-delete-dialog.html',
                    controller: 'TipoVehiculoApoyoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoVehiculoApoyo', function(TipoVehiculoApoyo) {
                            return TipoVehiculoApoyo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-vehiculo-apoyo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
