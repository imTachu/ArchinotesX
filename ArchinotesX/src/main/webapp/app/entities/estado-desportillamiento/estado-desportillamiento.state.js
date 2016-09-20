(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-desportillamiento', {
            parent: 'inspeccion-desportillamiento.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de desportillamientos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoDesportillamientoController',
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
                inspeccionDesportillamientos: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('estado-desportillamiento-detail', {
        //     parent: 'entity',
        //     url: '/estado-desportillamiento/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoDesportillamiento'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-desportillamiento/estado-desportillamiento-detail.html',
        //             controller: 'EstadoDesportillamientoDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoDesportillamiento', function($stateParams, EstadoDesportillamiento) {
        //             return EstadoDesportillamiento.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-desportillamiento.new', {
            parent: 'estado-desportillamiento',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoDesportillamientoDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoDesportillamiento', function(EstadoDesportillamiento) {
                    return new EstadoDesportillamiento ({
                        kilometro: null,
                        abscisa: null,
                        costadoInspeccion: null,
                        costadoVerificacion: null,
                        severidadInspeccion: null,
                        severidadVerificacion: null,
                        cantidadInspeccion: null,
                        cantidadVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['inspeccionDesportillamientos', function(inspeccionDesportillamientos) {
                    return inspeccionDesportillamientos;
                }]
            }
        })
        .state('estado-desportillamiento.edit', {
            parent: 'estado-desportillamiento',
            url: '/{id_estado_desportillamiento}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoDesportillamientoDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoDesportillamiento', function($stateParams, EstadoDesportillamiento) {
                    return EstadoDesportillamiento.get({ id: $stateParams.id_estado_desportillamiento }).$promise;
                }],
                inspeccionEntity: ['inspeccionDesportillamientos', function(inspeccionDesportillamientos) {
                    return inspeccionDesportillamientos;
                }]
            }
        })
        // .state('estado-desportillamiento.delete', {
        //     parent: 'estado-desportillamiento',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-desportillamiento/estado-desportillamiento-delete-dialog.html',
        //             controller: 'EstadoDesportillamientoDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoDesportillamiento', function(EstadoDesportillamiento) {
        //                     return EstadoDesportillamiento.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-desportillamiento', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-desportillamiento-confirmation', {
            parent: 'estado-desportillamiento.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoDesportillamiento', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoDesportillamiento) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoDesportillamiento,
                        entityName: 'estado-desportillamiento',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();
