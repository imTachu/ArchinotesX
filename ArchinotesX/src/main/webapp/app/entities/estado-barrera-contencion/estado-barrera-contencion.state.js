(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-barrera-contencion', {
            parent: 'inspeccion-barrera-contencion.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de barreras de contención'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoBarreraContencionController',
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
                inspeccionBarreraContencion: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        // .state('estado-barrera-contencion-detail', {
        //     parent: 'entity',
        //     url: '/estado-barrera-contencion/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoBarreraContencion'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-barrera-contencion/estado-barrera-contencion-detail.html',
        //             controller: 'EstadoBarreraContencionDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoBarreraContencion', function($stateParams, EstadoBarreraContencion) {
        //             return EstadoBarreraContencion.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-barrera-contencion.new', {
            parent: 'estado-barrera-contencion',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoBarreraContencionDialogController',
                    controllerAs: 'vm'
                }
            }, 
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoBarreraContencion', function(EstadoBarreraContencion) {
                    return new EstadoBarreraContencion ({
                        kilometroInicial: null,
                        abscisaInicial: null,
                        kilometroFinal: null,
                        abscisaFinal: null,
                        estadoEstructuralInspeccion: true,
                        estadoEstructuralVerificacion: true,
                        estadoAlineacionInspeccion: true,
                        estadoAlineacionVerificacion: true,
                        estadoOxidacionInspeccion: true,
                        estadoOxidacionVerificacion: true,
                        estadoAnclajeInspeccion: true,
                        estadoAnclajeVerificacion: true,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],                
                inspeccionEntity: ['inspeccionBarreraContencion', function(inspeccionBarreraContencion) {
                    return inspeccionBarreraContencion;
                }]
            }
        })
        .state('estado-barrera-contencion.edit', {
            parent: 'estado-barrera-contencion',
            url: '/{id_estado_barrera_contencion}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoBarreraContencionDialogController',
                    controllerAs: 'vm'
                }
            }, 
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoBarreraContencion', function($stateParams, EstadoBarreraContencion) {
                    return EstadoBarreraContencion.get({id : $stateParams.id_estado_barrera_contencion}).$promise;
                }],
                inspeccionEntity: ['inspeccionBarreraContencion', function(inspeccionBarreraContencion) {
                    return inspeccionBarreraContencion;
                }]   
            }
        })
        // .state('estado-barrera-contencion.delete', {
        //     parent: 'estado-barrera-contencion',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-barrera-contencion/estado-barrera-contencion-delete-dialog.html',
        //             controller: 'EstadoBarreraContencionDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoBarreraContencion', function(EstadoBarreraContencion) {
        //                     return EstadoBarreraContencion.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-barrera-contencion', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // });
        .state('estado-barrera-contencion-confirmation', {
            parent: 'estado-barrera-contencion.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoBarreraContencion', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoBarreraContencion) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoBarreraContencion,
                        entityName: 'estado-barrera-contencion',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();
