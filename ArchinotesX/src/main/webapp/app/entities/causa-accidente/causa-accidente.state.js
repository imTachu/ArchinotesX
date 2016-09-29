(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('causa-accidente', {
            parent: 'entity',
            url: '/causa-accidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN'],
                pageTitle: 'CausaAccidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/causa-accidente/causa-accidentes.html',
                    controller: 'CausaAccidenteController',
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
        .state('causa-accidente-detail', {
            parent: 'entity',
            url: '/causa-accidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN'],
                pageTitle: 'CausaAccidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/causa-accidente/causa-accidente-detail.html',
                    controller: 'CausaAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'CausaAccidente', function($stateParams, CausaAccidente) {
                    return CausaAccidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('causa-accidente.new', {
            parent: 'causa-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-accidente/causa-accidente-dialog.html',
                    controller: 'CausaAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                causaAccidente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('causa-accidente', null, { reload: true });
                }, function() {
                    $state.go('causa-accidente');
                });
            }]
        })
        .state('causa-accidente.edit', {
            parent: 'causa-accidente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-accidente/causa-accidente-dialog.html',
                    controller: 'CausaAccidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CausaAccidente', function(CausaAccidente) {
                            return CausaAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('causa-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('causa-accidente.delete', {
            parent: 'causa-accidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-accidente/causa-accidente-delete-dialog.html',
                    controller: 'CausaAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CausaAccidente', function(CausaAccidente) {
                            return CausaAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('causa-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
