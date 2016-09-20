(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('estado-margenes-separador', {
            parent: 'inspeccion-margenes-separador.edit',
            url: '/estado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Estados de margenes separadoras'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'EstadoMargenesSeparadorController',
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
                inspeccionMargenes: ['entity', function(entity) {
                    return entity;
                }]
            }
        })
        // .state('estado-margenes-separador-detail', {
        //     parent: 'entity',
        //     url: '/estado-margenes-separador/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'EstadoMargenesSeparador'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/estado-margenes-separador/estado-margenes-separador-detail.html',
        //             controller: 'EstadoMargenesSeparadorDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'EstadoMargenesSeparador', function($stateParams, EstadoMargenesSeparador) {
        //             return EstadoMargenesSeparador.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        .state('estado-margenes-separador.new', {
            parent: 'estado-margenes-separador',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoMargenesSeparadorDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['EstadoMargenesSeparador', function(EstadoMargenesSeparador) {
                    return new EstadoMargenesSeparador ({
                        kilometro: null,
                        abscisa: null,
                        margen: null,
                        alturaVegetacionInspeccion: null,
                        alturaVegetacionVerificacion: null,
                        articulosBasuraInspeccion: null,
                        articulosBasuraVerificacion: null,
                        observacionesInspeccion: null,
                        observacionesVerificacion: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }],
                inspeccionEntity: ['$stateParams', 'InspeccionMargenesSeparador', function($stateParams, InspeccionMargenesSeparador) {
                    return InspeccionMargenesSeparador.get({ id: $stateParams.id }).$promise;
                }]
            }
        })
        .state('estado-margenes-separador.edit', {
            parent: 'estado-margenes-separador',
            url: '/{id_estado_margenes}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'EstadoMargenesSeparadorDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'EstadoMargenesSeparador', function($stateParams, EstadoMargenesSeparador) {
                    return EstadoMargenesSeparador.get({ id: $stateParams.id_estado_margenes }).$promise;
                }],
                inspeccionEntity: ['$stateParams', 'InspeccionMargenesSeparador', function($stateParams, InspeccionMargenesSeparador) {
                    return InspeccionMargenesSeparador.get({ id: $stateParams.id }).$promise;
                }]
            }
        })
        // .state('estado-margenes-separador.delete', {
        //     parent: 'estado-margenes-separador',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/estado-margenes-separador/estado-margenes-separador-delete-dialog.html',
        //             controller: 'EstadoMargenesSeparadorDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['EstadoMargenesSeparador', function(EstadoMargenesSeparador) {
        //                     return EstadoMargenesSeparador.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('estado-margenes-separador', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('estado-margenes-separador-confirmation', {
            parent: 'estado-margenes-separador.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'inspeccionEntity', 'EstadoMargenesSeparador', function(EntityConfirmationControllerConfig, entity, inspeccionEntity, EstadoMargenesSeparador) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: EstadoMargenesSeparador,
                        entityName: 'estado-margenes-separador',
                        parentEntity: inspeccionEntity
                    });
                }]
            }
        });
    }
})();
