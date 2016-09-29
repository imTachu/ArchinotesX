(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('vehiculo-de-apoyo-accidente', {
            parent: 'accidente.edit',
            url: '/vehiculo-de-apoyo?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoDeApoyoAccidentes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'VehiculoDeApoyoAccidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Vehículo de apoyo'
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
                busquedaa: null,
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
        .state('vehiculo-de-apoyo-accidente-detail', {
            parent: 'entity',
            url: '/vehiculo-de-apoyo-accidente/{id_vehiculo_apoyo}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'VehiculoDeApoyoAccidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/vehiculo-de-apoyo-accidente/vehiculo-de-apoyo-accidente-detail.html',
                    controller: 'VehiculoDeApoyoAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoDeApoyoAccidente', function($stateParams, VehiculoDeApoyoAccidente) {
                    return VehiculoDeApoyoAccidente.get({id : $stateParams.id_vehiculo_apoyo});
                }]
            }
        })
        .state('vehiculo-de-apoyo-accidente.new', {
            parent: 'vehiculo-de-apoyo-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@':{
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoDeApoyoAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo vehículo'
            },
            resolve: {
                entity: ['VehiculoDeApoyoAccidente', function(VehiculoDeApoyoAccidente){
                    return new VehiculoDeApoyoAccidente ({
                        fechaSolicitudServicio: null,
                        fechaInicioServicio: null,
                        fechaFinServicio: null,
                        comentario: null,
                        id: null
                    });
                }],
                accidente: ['$q','$stateParams', 'Accidente', function($q, $stateParams, Accidente){
                    return Accidente.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-de-apoyo-accidente.edit', {
            parent: 'vehiculo-de-apoyo-accidente',
            url: '/{id_vehiculo_apoyo}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@':{
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'VehiculoDeApoyoAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar vehículo'
            },
            resolve: {
                entity: ['$stateParams', 'VehiculoDeApoyoAccidente', function($stateParams, VehiculoDeApoyoAccidente) {
                    return VehiculoDeApoyoAccidente.get({id : $stateParams.id_vehiculo_apoyo});
                }],
                accidente: ['$q', '$stateParams', 'Accidente', function($q, $stateParams, Accidente){
                    return Accidente.get({id:$stateParams.id}).$promise;
                }]
            }
        })
        .state('vehiculo-de-apoyo-accidente.delete', {
            parent: 'vehiculo-de-apoyo-accidente',
            url: '/{id_vehiculo_apoyo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/vehiculo-de-apoyo-accidente/vehiculo-de-apoyo-accidente-delete-dialog.html',
                    controller: 'VehiculoDeApoyoAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VehiculoDeApoyoAccidente', function(VehiculoDeApoyoAccidente) {
                            return VehiculoDeApoyoAccidente.get({id : $stateParams.id_vehiculo_apoyo});
                        }]
                    }
                }).result.then(function() {
                    $state.go('vehiculo-de-apoyo-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
