(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estructura-contencion', {
            parent: 'entity',
            url: '/estructura-contencion?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'EstructuraContencions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/estructura-contencion/estructura-contencions.html',
                    controller: 'EstructuraContencionController',
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
        .state('estructura-contencion-detail', {
            parent: 'entity',
            url: '/estructura-contencion/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'EstructuraContencion'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/estructura-contencion/estructura-contencion-detail.html',
                    controller: 'EstructuraContencionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'EstructuraContencion', function($stateParams, EstructuraContencion) {
                    return EstructuraContencion.get({id : $stateParams.id});
                }]
            }
        })
        .state('estructura-contencion.new', {
            parent: 'estructura-contencion',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-contencion/estructura-contencion-dialog.html',
                    controller: 'EstructuraContencionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                estructura: null,
                                margen: null,
                                material: null,
                                kilometro: null,
                                abscisa: null,
                                largo: null,
                                ancho: null,
                                altura: null,
                                baseMayor: null,
                                baseMenor: null,
                                radio: null,
                                estadoMaterial: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('estructura-contencion', null, { reload: true });
                }, function() {
                    $state.go('estructura-contencion');
                });
            }]
        })
        .state('estructura-contencion.edit', {
            parent: 'estructura-contencion',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-contencion/estructura-contencion-dialog.html',
                    controller: 'EstructuraContencionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EstructuraContencion', function(EstructuraContencion) {
                            return EstructuraContencion.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('estructura-contencion', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('estructura-contencion.delete', {
            parent: 'estructura-contencion',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-contencion/estructura-contencion-delete-dialog.html',
                    controller: 'EstructuraContencionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EstructuraContencion', function(EstructuraContencion) {
                            return EstructuraContencion.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('estructura-contencion', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
