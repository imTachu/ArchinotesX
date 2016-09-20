(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('vehiculo-afectado-en-accidente', {
            parent: 'accidente.edit',
            url: '/vehiculo-afectado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoAfectadoEnAccidentes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'VehiculoAfectadoEnAccidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Vehículos afectados'
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
                accidente: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        .state('vehiculo-afectado-en-accidente-detail', {
            parent: 'accidente.modal',
            url: '/vehiculo-afectado-en-accidente/{id_vehiculo_afectado}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoAfectadoEnAccidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/vehiculo-afectado-en-accidente/vehiculo-afectado-en-accidente-detail.html',
                    controller: 'VehiculoAfectadoEnAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoAfectadoEnAccidente', function($stateParams, VehiculoAfectadoEnAccidente) {
                    return VehiculoAfectadoEnAccidente.get({id : $stateParams.id_vehiculo_afectado});
                }]
            }
        })
        .state('vehiculo-afectado-en-accidente.new', {
            parent: 'vehiculo-afectado-en-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoAfectadoEnAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo vehículo'
            },
            resolve: {
                entity: ['VehiculoAfectadoEnAccidente', function(VehiculoAfectadoEnAccidente) {
                    return new VehiculoAfectadoEnAccidente({
                        placasVehiculoAccidente: null,
                        nombreConductorVehiculoAccidente: null,
                        telefonoConductorVehiculoAccidente: null,
                        id: null
                    });
                }],
                accidente: ['$stateParams','PaginationUtil', 'Accidente', function($stateParams, PaginationUtil, Accidente){
                    return Accidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-afectado-en-accidente.edit', {
            parent: 'vehiculo-afectado-en-accidente',
            url: '/{id_vehiculo_afectado}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoAfectadoEnAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar vehículo'
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoAfectadoEnAccidente', function($stateParams, VehiculoAfectadoEnAccidente) {
                    return VehiculoAfectadoEnAccidente.get({id : $stateParams.id_vehiculo_afectado}).$promise;
                }],
                accidente: ['$stateParams','PaginationUtil', 'Accidente', function($stateParams, PaginationUtil, Accidente){
                    return Accidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-afectado-en-accidente.delete', {
            parent: 'vehiculo-afectado-en-accidente',
            url: '/{id_vehiculo_afectado}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vehiculo-afectado-en-accidente/vehiculo-afectado-en-accidente-delete-dialog.html',
                    controller: 'VehiculoAfectadoEnAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VehiculoAfectadoEnAccidente', function(VehiculoAfectadoEnAccidente) {
                            return VehiculoAfectadoEnAccidente.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('vehiculo-afectado-en-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
