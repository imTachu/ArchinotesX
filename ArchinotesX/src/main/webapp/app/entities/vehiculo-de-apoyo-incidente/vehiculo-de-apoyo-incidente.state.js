(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('vehiculo-de-apoyo-incidente', {
            parent: 'incidente.edit',
            url: '/vehiculo-de-apoyo?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoDeApoyoIncidentes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'VehiculoDeApoyoIncidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Vehículos de apoyo'
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
        .state('vehiculo-de-apoyo-incidente-detail', {
            parent: 'incidente.modal',
            url: '/vehiculo-de-apoyo-incidente/{id_vehiculo_apoyo}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoDeApoyoIncidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/vehiculo-de-apoyo-incidente/vehiculo-de-apoyo-incidente-detail.html',
                    controller: 'VehiculoDeApoyoIncidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoDeApoyoIncidente', function($stateParams, VehiculoDeApoyoIncidente) {
                    return VehiculoDeApoyoIncidente.get({id : $stateParams.id_vehiculo_apoyo});
                }]
            }
        })
        .state('vehiculo-de-apoyo-incidente.new', {
            parent: 'vehiculo-de-apoyo-incidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoDeApoyoIncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo vehículo'
            },
            resolve: {
                entity: ['VehiculoDeApoyoIncidente', function(VehiculoDeApoyoIncidente) {
                    return new VehiculoDeApoyoIncidente ({
                        fechaSolicitudServicio: null,
                        fechaInicioServicio: null,
                        fechaFinServicio: null,
                        comentario: null,
                        id: null
                    });
                }],
                incidente: ['$stateParams','PaginationUtil', 'Incidente', function($stateParams, PaginationUtil, Incidente){
                    return Incidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-de-apoyo-incidente.edit', {
            parent: 'vehiculo-de-apoyo-incidente',
            url: '/{id_vehiculo_apoyo}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoDeApoyoIncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar vehículo'
            },
            resolve: {
                entity: ['$stateParams','VehiculoDeApoyoIncidente', function($stateParams, VehiculoDeApoyoIncidente) {
                    return VehiculoDeApoyoIncidente.get({id : $stateParams.id_vehiculo_apoyo}).$promise;
                }],
                incidente: ['$q', '$stateParams', 'PaginationUtil', 'Incidente', function($q, $stateParams, PaginationUtil, Incidente){
                    return Incidente.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-de-apoyo-incidente.delete', {
            parent: 'vehiculo-de-apoyo-incidente',
            url: '/{id_vehiculo_apoyo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vehiculo-de-apoyo-incidente/vehiculo-de-apoyo-incidente-delete-dialog.html',
                    controller: 'VehiculoDeApoyoIncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VehiculoDeApoyoIncidente', function(VehiculoDeApoyoIncidente) {
                            return VehiculoDeApoyoIncidente.get({id : $stateParams.id_vehiculo_apoyo});
                        }]
                    }
                }).result.then(function() {
                    $state.go('vehiculo-de-apoyo-incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
