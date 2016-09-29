(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('persona-afectada-en-accidente', {
            parent: 'accidente.edit',
            url: '/persona-afectada?pagina&orden&busqueda&limite',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'PersonaAfectadaEnAccidentes'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'PersonaAfectadaEnAccidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Personas afectadas'
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
        .state('persona-afectada-en-accidente-detail', {
            parent: 'entity',
            url: '/persona-afectada-en-accidente/{id_persona_afectada}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'PersonaAfectadaEnAccidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/persona-afectada-en-accidente/persona-afectada-en-accidente-detail.html',
                    controller: 'PersonaAfectadaEnAccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'PersonaAfectadaEnAccidente', function($stateParams, PersonaAfectadaEnAccidente) {
                    return PersonaAfectadaEnAccidente.get({id : $stateParams.id_persona_afectada});
                }]
            }
        })
        .state('persona-afectada-en-accidente.new', {
            parent: 'persona-afectada-en-accidente',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'PersonaAfectadaEnAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nueva persona'
            },
            resolve: {
                entity: ['PersonaAfectadaEnAccidente', function(PersonaAfectadaEnAccidente) {
                    return new PersonaAfectadaEnAccidente({
                        nombre: null,
                        genero: null,
                        edad: null,
                        fechaInicioTraslado: null,
                        fechaFinTraslado: null,
                        id: null
                    });
                }],
                accidente: ['$stateParams', 'Accidente', function($stateParams, Accidente){
                    return Accidente.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        .state('persona-afectada-en-accidente.edit', {
            parent: 'persona-afectada-en-accidente',
            url: '/{id_persona_afectada}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'PersonaAfectadaEnAccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar persona'
            },
            resolve: {
                entity: ['$stateParams','PersonaAfectadaEnAccidente', function($stateParams,PersonaAfectadaEnAccidente) {
                    return PersonaAfectadaEnAccidente.get({id : $stateParams.id_persona_afectada}).$promise;
                }],
                accidente: ['$stateParams', 'Accidente', function($stateParams, Accidente){
                    return Accidente.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        .state('persona-afectada-en-accidente.delete', {
            parent: 'persona-afectada-en-accidente',
            url: '/{id_persona_afectada}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/persona-afectada-en-accidente/persona-afectada-en-accidente-delete-dialog.html',
                    controller: 'PersonaAfectadaEnAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['PersonaAfectadaEnAccidente', function(PersonaAfectadaEnAccidente) {
                            return PersonaAfectadaEnAccidente.get({id : $stateParams.id_persona_afectada});
                        }]
                    }
                }).result.then(function() {
                    $state.go('persona-afectada-en-accidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
