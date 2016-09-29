(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-vehiculo-afectado', {
            parent: 'entity',
            url: '/tipo-vehiculo-afectado?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoVehiculoAfectados'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-vehiculo-afectado/tipo-vehiculo-afectados.html',
                    controller: 'TipoVehiculoAfectadoController',
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
        .state('tipo-vehiculo-afectado-detail', {
            parent: 'entity',
            url: '/tipo-vehiculo-afectado/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoVehiculoAfectado'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-vehiculo-afectado/tipo-vehiculo-afectado-detail.html',
                    controller: 'TipoVehiculoAfectadoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoVehiculoAfectado', function($stateParams, TipoVehiculoAfectado) {
                    return TipoVehiculoAfectado.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-vehiculo-afectado.new', {
            parent: 'tipo-vehiculo-afectado',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-afectado/tipo-vehiculo-afectado-dialog.html',
                    controller: 'TipoVehiculoAfectadoDialogController',
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
                    $state.go('tipo-vehiculo-afectado', null, { reload: true });
                }, function() {
                    $state.go('tipo-vehiculo-afectado');
                });
            }]
        })
        .state('tipo-vehiculo-afectado.edit', {
            parent: 'tipo-vehiculo-afectado',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-afectado/tipo-vehiculo-afectado-dialog.html',
                    controller: 'TipoVehiculoAfectadoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoVehiculoAfectado', function(TipoVehiculoAfectado) {
                            return TipoVehiculoAfectado.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-vehiculo-afectado', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-vehiculo-afectado.delete', {
            parent: 'tipo-vehiculo-afectado',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-vehiculo-afectado/tipo-vehiculo-afectado-delete-dialog.html',
                    controller: 'TipoVehiculoAfectadoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoVehiculoAfectado', function(TipoVehiculoAfectado) {
                            return TipoVehiculoAfectado.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-vehiculo-afectado', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
