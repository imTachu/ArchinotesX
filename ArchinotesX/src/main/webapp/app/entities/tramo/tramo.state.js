(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tramo', {
            parent: 'entity',
            url: '/tramo?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Tramos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tramo/tramos.html',
                    controller: 'TramoController',
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
        .state('tramo-detail', {
            parent: 'entity',
            url: '/tramo/{id}',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_OPERADOR1','ROLE_OPERADOR2', 'ROLE_CONSULTA_CONCESION', 'ROLE_CONSULTA_INTERVENTOR', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Tramo'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tramo/tramo-detail.html',
                    controller: 'TramoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Tramo', function($stateParams, Tramo) {
                    return Tramo.get({id : $stateParams.id});
                }]
            }
        })
        .state('tramo.new', {
            parent: 'tramo',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tramo/tramo-dialog.html',
                    controller: 'TramoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombreTramo: null,
                                unidadFuncional: null,
                                sector: null,
                                origen: null,
                                prNacionalInicio: null,
                                destino: null,
                                prNacionalFinal: null,
                                longitudAproximadaTramo: null,
                                intervencionPrevista: null,
                                observacion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tramo', null, { reload: true });
                }, function() {
                    $state.go('tramo');
                });
            }]
        })
        .state('tramo.edit', {
            parent: 'tramo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tramo/tramo-dialog.html',
                    controller: 'TramoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tramo', function(Tramo) {
                            return Tramo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tramo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tramo.delete', {
            parent: 'tramo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tramo/tramo-delete-dialog.html',
                    controller: 'TramoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Tramo', function(Tramo) {
                            return Tramo.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tramo', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
