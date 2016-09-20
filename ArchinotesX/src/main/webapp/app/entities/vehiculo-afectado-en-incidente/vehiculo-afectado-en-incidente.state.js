(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('vehiculo-afectado-en-incidente', {
            parent: 'incidente.edit',
            url: '/vehiculo-afectado?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoAfectadoEnIncidentes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'VehiculoAfectadoEnIncidenteController',
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
                        search: $stateParams.busuqeda,
                        size: parseInt($stateParams.limite)
                    };
                }],
                incidente: ['entity', function(entity){
                    return entity;
                }]
            }
        })
        .state('vehiculo-afectado-en-incidente-detail', {
            parent: 'entity',
            url: '/vehiculo-afectado-en-incidente/{id_vehiculo}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoAfectadoEnIncidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/vehiculo-afectado-en-incidente/vehiculo-afectado-en-incidente-detail.html',
                    controller: 'VehiculoAfectadoEnIncidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoAfectadoEnIncidente', function($stateParams, VehiculoAfectadoEnIncidente) {
                    return VehiculoAfectadoEnIncidente.get({id : $stateParams.id_vehiculo});
                }]
            }
        })
        .state('vehiculo-afectado-en-incidente.new', {
            parent: 'vehiculo-afectado-en-incidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoAfectadoEnIncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo vehículo'
            },
            resolve: {
                entity: ['VehiculoAfectadoEnIncidente', function(VehiculoAfectadoEnIncidente) {
                    return new VehiculoAfectadoEnIncidente ({
                        placasVehiculoIncidente: null,
                        nombreConductorVehiculoIncidente: null,
                        telefonoConductorVehiculoIncidente: null,
                        id: null
                    });
                }],
                incidente: ['$q', '$stateParams','PaginationUtil', 'Incidente', function($q, $stateParams, PaginationUtil, Incidente){
                    return Incidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-afectado-en-incidente.edit', {
            parent: 'vehiculo-afectado-en-incidente',
            url: '/{id_vehiculo}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoAfectadoEnIncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar vehículo'
            },
            resolve: {
                entity: ['$q', '$stateParams', 'VehiculoAfectadoEnIncidente', function($q, $stateParams, VehiculoAfectadoEnIncidente) {
                    return VehiculoAfectadoEnIncidente.get({id : $stateParams.id_vehiculo}).$promise;
                }],
                incidente: ['$q', '$stateParams','PaginationUtil', 'Incidente', function($q, $stateParams, PaginationUtil, Incidente){
                    return Incidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-afectado-en-incidente.delete', {
            parent: 'vehiculo-afectado-en-incidente',
            url: '/{id_vehiculo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vehiculo-afectado-en-incidente/vehiculo-afectado-en-incidente-delete-dialog.html',
                    controller: 'VehiculoAfectadoEnIncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VehiculoAfectadoEnIncidente', function(VehiculoAfectadoEnIncidente) {
                            return VehiculoAfectadoEnIncidente.get({id : $stateParams.id_vehiculo});
                        }]
                    }
                }).result.then(function() {
                    $state.go('vehiculo-afectado-en-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
