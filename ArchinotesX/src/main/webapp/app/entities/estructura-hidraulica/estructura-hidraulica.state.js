(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estructura-hidraulica', {
            parent: 'entity',
            url: '/estructura-hidraulica?page&sort&search&size',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'EstructuraHidraulicas'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/estructura-hidraulica/estructura-hidraulicas.html',
                    controller: 'EstructuraHidraulicaController',
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
        .state('estructura-hidraulica-detail', {
            parent: 'entity',
            url: '/estructura-hidraulica/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'EstructuraHidraulica'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/estructura-hidraulica/estructura-hidraulica-detail.html',
                    controller: 'EstructuraHidraulicaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'EstructuraHidraulica', function($stateParams, EstructuraHidraulica) {
                    return EstructuraHidraulica.get({id : $stateParams.id});
                }]
            }
        })
        .state('estructura-hidraulica.new', {
            parent: 'estructura-hidraulica',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-hidraulica/estructura-hidraulica-dialog.html',
                    controller: 'EstructuraHidraulicaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                estructura: null,
                                kilometro: null,
                                abscisa: null,
                                largo: null,
                                ancho: null,
                                altura: null,
                                baseMayor: null,
                                baseMenor: null,
                                radio: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('estructura-hidraulica', null, { reload: true });
                }, function() {
                    $state.go('estructura-hidraulica');
                });
            }]
        })
        .state('estructura-hidraulica.edit', {
            parent: 'estructura-hidraulica',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-hidraulica/estructura-hidraulica-dialog.html',
                    controller: 'EstructuraHidraulicaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EstructuraHidraulica', function(EstructuraHidraulica) {
                            return EstructuraHidraulica.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('estructura-hidraulica', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('estructura-hidraulica.delete', {
            parent: 'estructura-hidraulica',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/estructura-hidraulica/estructura-hidraulica-delete-dialog.html',
                    controller: 'EstructuraHidraulicaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EstructuraHidraulica', function(EstructuraHidraulica) {
                            return EstructuraHidraulica.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('estructura-hidraulica', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
