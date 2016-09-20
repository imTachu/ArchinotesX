(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('ocupacion-carriles-detalle', {
            parent: 'ocupacion-carriles.edit',
            url: '/detalle?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Detalles de ocupación de carriles'
            },
            ncyBreadcrumb: {
                label: 'Detalle'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'OcupacionCarrilesDetalleController',
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
                ocupacionCarriles: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('ocupacion-carriles-detalle-detail', {
        //     parent: 'entity',
        //     url: '/ocupacion-carriles-detalle/{id_detalle}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'Detalle de ocupación de carriles'
        //     },
        //     views: {
        //         'dialog-content@': {
        //             templateUrl: 'app/entities/ocupacion-carriles-detalle/ocupacion-carriles-detalle-detail.html',
        //             controller: 'OcupacionCarrilesDetalleDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'OcupacionCarrilesDetalle', function($stateParams, OcupacionCarrilesDetalle) {
        //             return OcupacionCarrilesDetalle.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('ocupacion-carriles-detalle.new', {
            parent: 'ocupacion-carriles-detalle',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Detalle de ocupación de carriles'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'OcupacionCarrilesDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo detalle'
            },
            resolve: {
                entity: ['OcupacionCarrilesDetalle', function(OcupacionCarrilesDetalle) {
                    return new OcupacionCarrilesDetalle({
                        fechaInicial: null,
                        longitudColaInicial: null,
                        fechaFinal: null,
                        longitudColaFinal: null,
                        id: null
                    });
                }],
                ocupacionCarriles: ['ocupacionCarriles', function(ocupacionCarriles){
                    return ocupacionCarriles;
                }]
            }
        })
        .state('ocupacion-carriles-detalle.edit', {
            parent: 'ocupacion-carriles-detalle',
            url: '/{id_detalle}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Detalle de ocupación de carriles'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'OcupacionCarrilesDetalleDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar detalle'
            },
            resolve: {
                entity: ['OcupacionCarrilesDetalle', '$stateParams', function(OcupacionCarrilesDetalle, $stateParams) {
                    return OcupacionCarrilesDetalle.get({id : $stateParams.id_detalle}).$promise;
                }],
                ocupacionCarriles: ['ocupacionCarriles', function(ocupacionCarriles){
                    return ocupacionCarriles;
                }]
            }
        });
        // .state('ocupacion-carriles-detalle.delete', {
        //     parent: 'ocupacion-carriles-detalle',
        //     url: '/{id_detalle}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/ocupacion-carriles-detalle/ocupacion-carriles-detalle-delete-dialog.html',
        //             controller: 'OcupacionCarrilesDetalleDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['OcupacionCarrilesDetalle', function(OcupacionCarrilesDetalle) {
        //                     return OcupacionCarrilesDetalle.get({id : $stateParams.id_detalle}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('ocupacion-carriles-detalle', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // });
    }

})();
