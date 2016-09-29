(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('causa-incidente', {
            parent: 'entity',
            url: '/causa-incidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN'],
                pageTitle: 'CausaIncidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/causa-incidente/causa-incidentes.html',
                    controller: 'CausaIncidenteController',
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
        .state('causa-incidente-detail', {
            parent: 'entity',
            url: '/causa-incidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN'],
                pageTitle: 'CausaIncidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/causa-incidente/causa-incidente-detail.html',
                    controller: 'CausaIncidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'CausaIncidente', function($stateParams, CausaIncidente) {
                    return CausaIncidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('causa-incidente.new', {
            parent: 'causa-incidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR','ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-incidente/causa-incidente-dialog.html',
                    controller: 'CausaIncidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                causaIncidente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('causa-incidente', null, { reload: true });
                }, function() {
                    $state.go('causa-incidente');
                });
            }]
        })
        .state('causa-incidente.edit', {
            parent: 'causa-incidente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-incidente/causa-incidente-dialog.html',
                    controller: 'CausaIncidenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['CausaIncidente', function(CausaIncidente) {
                            return CausaIncidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('causa-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('causa-incidente.delete', {
            parent: 'causa-incidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/causa-incidente/causa-incidente-delete-dialog.html',
                    controller: 'CausaIncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['CausaIncidente', function(CausaIncidente) {
                            return CausaIncidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('causa-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
