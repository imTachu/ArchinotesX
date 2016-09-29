(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('factor-climatologico', {
            parent: 'entity',
            url: '/factor-climatologico?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'FactorClimatologicos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/factor-climatologico/factor-climatologicos.html',
                    controller: 'FactorClimatologicoController',
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
        .state('factor-climatologico-detail', {
            parent: 'entity',
            url: '/factor-climatologico/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'FactorClimatologico'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/factor-climatologico/factor-climatologico-detail.html',
                    controller: 'FactorClimatologicoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'FactorClimatologico', function($stateParams, FactorClimatologico) {
                    return FactorClimatologico.get({id : $stateParams.id});
                }]
            }
        })
        .state('factor-climatologico.new', {
            parent: 'factor-climatologico',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/factor-climatologico/factor-climatologico-dialog.html',
                    controller: 'FactorClimatologicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                condicionClima: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('factor-climatologico', null, { reload: true });
                }, function() {
                    $state.go('factor-climatologico');
                });
            }]
        })
        .state('factor-climatologico.edit', {
            parent: 'factor-climatologico',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/factor-climatologico/factor-climatologico-dialog.html',
                    controller: 'FactorClimatologicoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FactorClimatologico', function(FactorClimatologico) {
                            return FactorClimatologico.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('factor-climatologico', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('factor-climatologico.delete', {
            parent: 'factor-climatologico',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/factor-climatologico/factor-climatologico-delete-dialog.html',
                    controller: 'FactorClimatologicoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FactorClimatologico', function(FactorClimatologico) {
                            return FactorClimatologico.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('factor-climatologico', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
