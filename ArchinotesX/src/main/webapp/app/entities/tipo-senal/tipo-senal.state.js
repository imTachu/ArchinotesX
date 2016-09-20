(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-senal', {
            parent: 'entity',
            url: '/tipo-senal?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoSenals'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-senal/tipo-senals.html',
                    controller: 'TipoSenalController',
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
        .state('tipo-senal-detail', {
            parent: 'entity',
            url: '/tipo-senal/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoSenal'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-senal/tipo-senal-detail.html',
                    controller: 'TipoSenalDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoSenal', function($stateParams, TipoSenal) {
                    return TipoSenal.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-senal.new', {
            parent: 'tipo-senal',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-senal/tipo-senal-dialog.html',
                    controller: 'TipoSenalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nombreSenal: null,
                                kilometro: null,
                                abscisa: null,
                                margenSenal: null,
                                tipoSenal: null,
                                tipoPapel: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-senal', null, { reload: true });
                }, function() {
                    $state.go('tipo-senal');
                });
            }]
        })
        .state('tipo-senal.edit', {
            parent: 'tipo-senal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-senal/tipo-senal-dialog.html',
                    controller: 'TipoSenalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoSenal', function(TipoSenal) {
                            return TipoSenal.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-senal', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-senal.delete', {
            parent: 'tipo-senal',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-senal/tipo-senal-delete-dialog.html',
                    controller: 'TipoSenalDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoSenal', function(TipoSenal) {
                            return TipoSenal.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-senal', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
