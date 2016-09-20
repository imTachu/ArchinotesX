(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-senalizacion-v', {
            parent: 'inspeccion-senalizacion-v.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de señalizaciones verticales'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoSenalizacionVController',
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
                inspeccionSenalizacionVs: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        // .state('estado-senalizacion-v-detail', {
        //     parent: 'entity',
        //     url: '/estado-senalizacion-v/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoSenalizacionV'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-senalizacion-v/estado-senalizacion-v-detail.html',
        //             controller: 'EstadoSenalizacionVDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoSenalizacionV', function($stateParams, EstadoSenalizacionV) {
        //             return EstadoSenalizacionV.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-senalizacion-v.new', {
            parent: 'estado-senalizacion-v',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoSenalizacionVDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoSenalizacionV', function(EstadoSenalizacionV) {
                    return new EstadoSenalizacionV ({
                        kilometro: null,
                        abscisa: null,
                        margen: null,
                        amarilloInspeccion: null,
                        amarilloVerificacion: null,
                        blancoInspeccion: null,
                        blancoVerificacion: null,
                        verdeInspeccion: null,
                        verdeVerificacion: null,
                        rojoInspeccion: null,
                        rojoVerificacion: null,
                        azulInspeccion: null,
                        azulVerificacion: null,
                        posLegInspeccion: null,
                        posLegVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['inspeccionSenalizacionVs', function(inspeccionSenalizacionVs){
                    return inspeccionSenalizacionVs;
                }]
            }
        })
        .state('estado-senalizacion-v.edit', {
            parent: 'estado-senalizacion-v',
            url: '/{id_estado_senalizacion_v}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoSenalizacionVDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoSenalizacionV', function($stateParams, EstadoSenalizacionV) {
                    return EstadoSenalizacionV.get({id : $stateParams.id_estado_senalizacion_v}).$promise;
                }],
                inspeccionEntity: ['inspeccionSenalizacionVs', function(inspeccionSenalizacionVs){
                    return inspeccionSenalizacionVs;
                }]
            }
        })
        // .state('estado-senalizacion-v.delete', {
        //     parent: 'estado-senalizacion-v',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-senalizacion-v/estado-senalizacion-v-delete-dialog.html',
        //             controller: 'EstadoSenalizacionVDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoSenalizacionV', function(EstadoSenalizacionV) {
        //                     return EstadoSenalizacionV.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-senalizacion-v', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-senalizacion-v-confirmation', {
            parent: 'estado-senalizacion-v.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoSenalizacionV', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoSenalizacionV) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoSenalizacionV,
                        entityName: 'estado-senalizacion-v',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();
