(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-senalizacion-h', {
            parent: 'inspeccion-senalizacion-h.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de señalizaciones horizontales'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoSenalizacionHController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label:'Estados'
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
                inspeccionSenalizacionHs: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        // .state('estado-senalizacion-h-detail', {
        //     parent: 'entity',
        //     url: '/estado-senalizacion-h/{id_estado_senalizacion_h}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoSenalizacionH'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-senalizacion-h/estado-senalizacion-h-detail.html',
        //             controller: 'EstadoSenalizacionHDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoSenalizacionH', function($stateParams, EstadoSenalizacionH) {
        //             return EstadoSenalizacionH.get({id : $stateParams.id_estado_senalizacion_h}).$promise;
        //         }]
        //     }
        // })
        .state('estado-senalizacion-h.new', {
            parent: 'estado-senalizacion-h',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoSenalizacionH', function(EstadoSenalizacionH) {
                    return new EstadoSenalizacionH ({
                        kilometroInicial: null,
                        abscisaInicial: null,
                        kilometroFinal: null,
                        abscisaFinal: null,
                        lineaInspeccion: null,
                        lineaVerificacion: null,
                        tipoLineaInspeccion: null,
                        tipoLineaVerificacion: null,
                        promedioInspeccion: null,
                        promedioVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['inspeccionSenalizacionHs', function(inspeccionSenalizacionHs){
                    return inspeccionSenalizacionHs;
                }]
            }
        })
        .state('estado-senalizacion-h.edit', {
            parent: 'estado-senalizacion-h',
            url: '/{id_estado_senalizacion_h}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar-Ver'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoSenalizacionH', function($stateParams, EstadoSenalizacionH) {
                    return EstadoSenalizacionH.get({id : $stateParams.id_estado_senalizacion_h}).$promise;
                }],
                inspeccionEntity: ['inspeccionSenalizacionHs', function(inspeccionSenalizacionHs){
                    return inspeccionSenalizacionHs;
                }]
            }
        })
        // .state('estado-senalizacion-h.delete', {
        //     parent: 'estado-senalizacion-h',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-senalizacion-h/estado-senalizacion-h-delete-dialog.html',
        //             controller: 'EstadoSenalizacionHDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoSenalizacionH', function(EstadoSenalizacionH) {
        //                     return EstadoSenalizacionH.get({id : $stateParams.id_estado_senalizacion_h}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-senalizacion-h', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-senalizacion-h-confirmation', {
            parent: 'estado-senalizacion-h.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoSenalizacionH', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoSenalizacionH) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoSenalizacionH,
                        entityName: 'estado-senalizacion-h',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();


