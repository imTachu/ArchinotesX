(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-drenajes', {
            parent: 'inspeccion-drenajes.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de drenajes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoDrenajesController',
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
                inspeccionDrenajes: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        // .state('estado-drenajes-detail', {
        //     parent: 'entity',
        //     url: '/estado-drenajes/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoDrenajes'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-drenajes/estado-drenajes-detail.html',
        //             controller: 'EstadoDrenajesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoDrenajes', function($stateParams, EstadoDrenajes) {
        //             return EstadoDrenajes.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-drenajes.new', {
            parent: 'estado-drenajes',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoDrenajesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoDrenajes', function(EstadoDrenajes) {
                    return new EstadoDrenajes ({
                        kilometro: null,
                        abscisa: null,
                        margen: null,
                        colmatacionInspeccion: null,
                        colmatacionVerificacion: null,
                        hcolmatacionInspeccion: null,
                        hcolmatacionVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        encoleInspeccion: null,
                        descoleInspeccion: null,
                        encoleVerificacion: null,
                        descoleVerificacion: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['inspeccionDrenajes', function(inspeccionDrenajes){
                    return inspeccionDrenajes;
                }]
            }
        })
        .state('estado-drenajes.edit', {
            parent: 'estado-drenajes',
            url: '/{id_estado_drenajes}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoDrenajesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoDrenajes', function($stateParams, EstadoDrenajes) {
                    return EstadoDrenajes.get({id : $stateParams.id_estado_drenajes}).$promise;
                }],
                inspeccionEntity: ['inspeccionDrenajes', function(inspeccionDrenajes){
                    return inspeccionDrenajes;
                }]
            }
        })
        // .state('estado-drenajes.delete', {
        //     parent: 'estado-drenajes',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-drenajes/estado-drenajes-delete-dialog.html',
        //             controller: 'EstadoDrenajesDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoDrenajes', function(EstadoDrenajes) {
        //                     return EstadoDrenajes.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-drenajes', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-drenajes-confirmation', {
            parent: 'estado-drenajes.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoDrenajes', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoDrenajes) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoDrenajes,
                        entityName: 'estado-drenajes',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }

})();
