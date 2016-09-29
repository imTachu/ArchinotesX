(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('tipo-afectacion-persona', {
            parent: 'entity',
            url: '/tipo-afectacion-persona?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoAfectacionPersonas'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-afectacion-persona/tipo-afectacion-personas.html',
                    controller: 'TipoAfectacionPersonaController',
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
        .state('tipo-afectacion-persona-detail', {
            parent: 'entity',
            url: '/tipo-afectacion-persona/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'TipoAfectacionPersona'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tipo-afectacion-persona/tipo-afectacion-persona-detail.html',
                    controller: 'TipoAfectacionPersonaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TipoAfectacionPersona', function($stateParams, TipoAfectacionPersona) {
                    return TipoAfectacionPersona.get({id : $stateParams.id});
                }]
            }
        })
        .state('tipo-afectacion-persona.new', {
            parent: 'tipo-afectacion-persona',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-afectacion-persona/tipo-afectacion-persona-dialog.html',
                    controller: 'TipoAfectacionPersonaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tipoAfectacion: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tipo-afectacion-persona', null, { reload: true });
                }, function() {
                    $state.go('tipo-afectacion-persona');
                });
            }]
        })
        .state('tipo-afectacion-persona.edit', {
            parent: 'tipo-afectacion-persona',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-afectacion-persona/tipo-afectacion-persona-dialog.html',
                    controller: 'TipoAfectacionPersonaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TipoAfectacionPersona', function(TipoAfectacionPersona) {
                            return TipoAfectacionPersona.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-afectacion-persona', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tipo-afectacion-persona.delete', {
            parent: 'tipo-afectacion-persona',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tipo-afectacion-persona/tipo-afectacion-persona-delete-dialog.html',
                    controller: 'TipoAfectacionPersonaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TipoAfectacionPersona', function(TipoAfectacionPersona) {
                            return TipoAfectacionPersona.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('tipo-afectacion-persona', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
