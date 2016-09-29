(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-novedad-accidente', {
            parent: 'entity',
            url: '/tipo-novedad-accidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoNovedadAccidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-novedad-accidente/tipo-novedad-accidentes.html',
                    controller: 'TipoNovedadAccidenteController',
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
        .state('tipo-novedad-accidente-detail', {
            parent: 'entity',
            url: '/tipo-novedad-accidente/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoNovedadAccidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-novedad-accidente/tipo-novedad-accidente-detail.html',
                    controller: 'TipoNovedadAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoNovedadAccidente', function($stateParams, TipoNovedadAccidente) {
                    return TipoNovedadAccidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-novedad-accidente.new', {
            parent: 'tipo-novedad-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-novedad-accidente/tipo-novedad-accidente-dialog.html',
                    controller: 'TipoNovedadAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipoNovedad: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-novedad-accidente', null, { reload: true });
                }, function() {
                    $state.go('tipo-novedad-accidente');
                });
            }]
        })
        .state('tipo-novedad-accidente.edit', {
            parent: 'tipo-novedad-accidente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-novedad-accidente/tipo-novedad-accidente-dialog.html',
                    controller: 'TipoNovedadAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoNovedadAccidente', function(TipoNovedadAccidente) {
                            return TipoNovedadAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-novedad-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-novedad-accidente.delete', {
            parent: 'tipo-novedad-accidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-novedad-accidente/tipo-novedad-accidente-delete-dialog.html',
                    controller: 'TipoNovedadAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoNovedadAccidente', function(TipoNovedadAccidente) {
                            return TipoNovedadAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-novedad-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
