(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('peaje', {
            parent: 'entity',
            url: '/peaje?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Peajes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/peaje/peajes.html',
                    controller: 'PeajeController',
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
        .state('peaje-detail', {
            parent: 'entity',
            url: '/peaje/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Peaje'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/peaje/peaje-detail.html',
                    controller: 'PeajeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Peaje', function($stateParams, Peaje) {
                    return Peaje.get({id : $stateParams.id});
                }]
            }
        })
        .state('peaje.new', {
            parent: 'peaje',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/peaje/peaje-dialog.html',
                    controller: 'PeajeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                kilometro: null,
                                abscisa: null,
                                nombrePeaje: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('peaje', null, { reload: true });
                }, function() {
                    $state.go('peaje');
                });
            }]
        })
        .state('peaje.edit', {
            parent: 'peaje',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/peaje/peaje-dialog.html',
                    controller: 'PeajeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Peaje', function(Peaje) {
                            return Peaje.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('peaje', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('peaje.delete', {
            parent: 'peaje',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/peaje/peaje-delete-dialog.html',
                    controller: 'PeajeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Peaje', function(Peaje) {
                            return Peaje.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('peaje', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
