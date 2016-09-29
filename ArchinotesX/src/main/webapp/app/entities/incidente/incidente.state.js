(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('incidente', {
            parent: 'entity',
            url: '/incidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Incidentes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'IncidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                skip: true // Never display this state in breadcrumb.
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null,
                size: {
                    value: paginationConstants.itemsPerPage.toString(),
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search,
                        size: parseInt($stateParams.size)
                    };
                }]
            }
        })
        .state('incidente-detail', {
            parent: 'entity',
            url: '/incidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Incidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/incidente/incidente-detail.html',
                    controller: 'IncidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Incidente', function($stateParams, Incidente) {
                    return Incidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('incidente.modal',{
            parent: 'incidente',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            abstract: true,
            onEnter: ['$stateParams', '$state', '$uibModal', 'EntityModalControllerConfig', function($stateParams, $state, $uibModal, EntityModalControllerConfig){
                this.modalDialog=$uibModal.open({
                    templateUrl: 'app/entities/_components/entity-modal/templates/modal-base.html',
                    controller: 'EntityModalController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        modalControllerConfig: function () {
                            return new EntityModalControllerConfig ('incidente');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('incidente', null, {reload:true});
                }, function() {
                    $state.go('incidente', null, {reload:true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('incidente.new', {
            parent: 'incidente.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            ncyBreadcrumb: {
                label: 'Nuevo incidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['Incidente', function(Incidente) {
                    return new Incidente ({
                        kilometro: null,
                        abscisa: null,
                        fechaRecepcionLlamada: null,
                        fechaInicioSenalizacion: null,
                        fechaFinSenalizacion: null,
                        fechaInicioDespeje: null,
                        fechaFinDespeje: null,
                        comentario: null,
                        comentarioInterventor: null,
                        estado: null,
                        m3Derrumbe: null,
                        otraInfraestructuraAfectada: null,
                        cumple: null,
                        nombrePersonaQueReporta: null,
                        telefonoPersonaQueReporta: null,
                        id: null
                    });
                }]
            }
        })
        .state('incidente.edit', {
            parent: 'incidente.modal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IncidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar incidente'
            },
            resolve: {
                entity: ['$stateParams','Incidente', function($stateParams, Incidente) {
                    return Incidente.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('incidente.delete', {
            parent: 'incidente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/incidente/incidente-delete-dialog.html',
                    controller: 'IncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Incidente', function(Incidente) {
                            return Incidente.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('incidente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('incidente-confirmation', {
            parent: 'incidente.edit',
            url: '/confirmation',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Incidente'
            },
            ncyBreadcrumb: {
                label: 'Confirmación'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-confirmation/templates/confirmation-base.html',
                    controller: 'InspeccionEntityConfirmationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'Incidente', function(EntityConfirmationControllerConfig, entity, Incidente) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: Incidente,
                        entityName: 'incidente'
                    });
                }]
            }
        });
    }
})();
