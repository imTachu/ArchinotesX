(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-baches', {
            parent: 'inspeccion-baches.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de baches'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoBachesController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Estados'
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
                pagingParams: ['$stateParams', 'PaginationUtil', function($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.pagina),
                        sort: $stateParams.orden,
                        predicate: PaginationUtil.parsePredicate($stateParams.orden),
                        ascending: PaginationUtil.parseAscending($stateParams.orden),
                        search: $stateParams.busqueda,
                        size: parseInt($stateParams.limite)
                    };
                }],
                inspeccionBaches: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('estado-baches-detail', {
        //     parent: 'entity',
        //     url: '/estado-baches/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoBaches'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-baches/estado-baches-detail.html',
        //             controller: 'EstadoBachesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoBaches', function($stateParams, EstadoBaches) {
        //             return EstadoBaches.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-baches.new', {
            parent: 'estado-baches',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoBachesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoBaches', function(EstadoBaches) {
                    return new EstadoBaches ({
                        kilometro: null,
                        abscisa: null,
                        costado: null,
                        largoInspeccion: null,
                        largoVerificacion: null,
                        anchoInspeccion: null,
                        anchoVerificacion: null,
                        profundidadInspeccion: null,
                        profundidadVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['inspeccionBaches', function(inspeccionBaches) {
                    return inspeccionBaches;
                }]
            }
        })
        .state('estado-baches.edit', {
            parent: 'estado-baches',
            url: '/{id_estado_baches}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoBachesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoBaches', function($stateParams, EstadoBaches) {
                    return EstadoBaches.get({ id: $stateParams.id_estado_baches }).$promise;
                }],
                inspeccionEntity: ['inspeccionBaches', function(inspeccionBaches) {
                    return inspeccionBaches;
                }]
            }
        })
        // .state('estado-baches.delete', {
        //     parent: 'estado-baches',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-baches/estado-baches-delete-dialog.html',
        //             controller: 'EstadoBachesDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoBaches', function(EstadoBaches) {
        //                     return EstadoBaches.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-baches', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-baches-confirmation', {
            parent: 'estado-baches.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Confirmación'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-confirmation/templates/confirmation-base.html',
                    controller: 'EstadoEntityConfirmationController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Confirmación'
            },
            resolve: {
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoBaches', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoBaches) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoBaches,
                        entityName: 'estado-baches',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();
