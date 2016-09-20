(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('indice-mortalidad-detalle', {
            parent: 'indice-mortalidad.edit',
            url: '/detalle?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Detalles de índice de mortalidad'
            },
            ncyBreadcrumb: {
                label: 'Detalle'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'IndiceMortalidadDetalleController',
                    controllerAs: 'vm'
                }
            },
            params: {
                pagina: {
                    value: '1',
                    squash: true
                },
                orden: {
                    value: 'id,asc',
                    squash: true
                },
                busqueda: null,
                limite: {
                    value: paginationConstants.itemsPerPage.toString(),
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.pagina),
                        sort: $stateParams.orden,
                        predicate: PaginationUtil.parsePredicate($stateParams.orden),
                        ascending: PaginationUtil.parseAscending($stateParams.orden),
                        search: $stateParams.busqueda,
                        size: parseInt($stateParams.limite)
                    };
                }],
                indiceMortalidad: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('indice-mortalidad-detalle-detail', {
        //     parent: 'entity',
        //     url: '/indice-mortalidad-detalle/{id_detalle}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'Detalle del índice de mortalidad'
        //     },
        //     views: {
        //         'dialog-content@': {
        //             templateUrl: 'app/entities/indice-mortalidad-detalle/indice-mortalidad-detalle-detail.html',
        //             controller: 'IndiceMortalidadDetalleDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'IndiceMortalidadDetalle', function($stateParams, IndiceMortalidadDetalle) {
        //             return IndiceMortalidadDetalle.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('indice-mortalidad-detalle.new', {
            parent: 'indice-mortalidad-detalle',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Detalle de índice de mortalidad'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IndiceMortalidadDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo detalle'
            },
            resolve: {
                entity: ['IndiceMortalidadDetalle', function(IndiceMortalidadDetalle) {
                    return new IndiceMortalidadDetalle({
                        unidadFuncional: null,
                        kilometroInicial: null,
                        abscisaInicial: null,
                        kilometroFinal: null,
                        abscisaFinal: null,
                        tramoCritico: null,
                        numeroVictimasFatales: null,
                        id: null
                    });
                }],
                indiceMortalidad: ['indiceMortalidad', function(indiceMortalidad){
                    return indiceMortalidad;
                }]
            }
        })
        .state('indice-mortalidad-detalle.edit', {
            parent: 'indice-mortalidad-detalle',
            url: '/{id_detalle}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Detalle de índice de mortalidad'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IndiceMortalidadDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar detalle'
            },
            resolve: {
                entity: ['IndiceMortalidadDetalle', '$stateParams', function(IndiceMortalidadDetalle, $stateParams) {
                    return IndiceMortalidadDetalle.get({id : $stateParams.id_detalle}).$promise;
                }],
                indiceMortalidad: ['indiceMortalidad', function(indiceMortalidad){
                    return indiceMortalidad;
                }]
            }
        });
        // .state('indice-mortalidad-detalle.delete', {
        //     parent: 'indice-mortalidad-detalle',
        //     url: '/{id_detalle}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/indice-mortalidad-detalle/indice-mortalidad-detalle-delete-dialog.html',
        //             controller: 'IndiceMortalidadDetalleDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['IndiceMortalidadDetalle', function(IndiceMortalidadDetalle) {
        //                     return IndiceMortalidadDetalle.get({id : $stateParams.id_detalle}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('indice-mortalidad-detalle', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // });
    }

})();
