(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('cola-peaje-detalle', {
            parent: 'cola-peaje.edit',
            url: '/detalle?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Detalles de cola de peaje'
            },
            ncyBreadcrumb: {
                label: 'Detalle'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ColaPeajeDetalleController',
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
                colaPeaje: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('cola-peaje-detalle-detail', {
        //     parent: 'entity',
        //     url: '/cola-peaje-detalle/{id_detalle}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'Detalle de cola de peaje'
        //     },
        //     views: {
        //         'dialog-content@': {
        //             templateUrl: 'app/entities/cola-peaje-detalle/cola-peaje-detalle-detail.html',
        //             controller: 'ColaPeajeDetalleDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ColaPeajeDetalle', function($stateParams, ColaPeajeDetalle) {
        //             return ColaPeajeDetalle.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('cola-peaje-detalle.new', {
            parent: 'cola-peaje-detalle',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Detalle de cola de peaje'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'ColaPeajeDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo detalle'
            },
            resolve: {
                entity: ['ColaPeajeDetalle', function(ColaPeajeDetalle) {
                    return new ColaPeajeDetalle({
                        numeroCarril: null,
                        fechaInicial: null,
                        cantidadVehiculosInicial: null,
                        fechaFinal: null,
                        cantidadVehiculosFinal: null,
                        id: null
                    });
                }],
                colaPeaje: ['colaPeaje', function(colaPeaje){
                    return colaPeaje;
                }]
            }
        })
        .state('cola-peaje-detalle.edit', {
            parent: 'cola-peaje-detalle',
            url: '/{id_detalle}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Detalle de cola de peaje'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'ColaPeajeDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar detalle'
            },
            resolve: {
                entity: ['ColaPeajeDetalle', '$stateParams', function(ColaPeajeDetalle, $stateParams) {
                    return ColaPeajeDetalle.get({id : $stateParams.id_detalle}).$promise;
                }],
                colaPeaje: ['colaPeaje', function(colaPeaje){
                    return colaPeaje;
                }]
            }
        });
        // .state('cola-peaje-detalle.delete', {
        //     parent: 'cola-peaje-detalle',
        //     url: '/{id_detalle}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/cola-peaje-detalle/cola-peaje-detalle-delete-dialog.html',
        //             controller: 'ColaPeajeDetalleDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['ColaPeajeDetalle', function(ColaPeajeDetalle) {
        //                     return ColaPeajeDetalle.get({id : $stateParams.id_detalle}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('cola-peaje-detalle', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // });
    }

})();
