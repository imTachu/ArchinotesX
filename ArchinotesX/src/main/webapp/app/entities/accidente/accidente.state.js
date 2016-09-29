(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('accidente', {
            parent: 'entity',
            url: '/accidente?page&sort&search&size',
            data: {
                authorities: ['ROLE_REFERENCE_ARCHITECT'],
                pageTitle: 'SQL Datasources'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'AccidenteController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                skip: true
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
        .state('accidente-detail', {
            parent: 'entity',
            url: '/accidente/{id}',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Accidente'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/accidente/accidente-detail.html',
                    controller: 'AccidenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Accidente', function($stateParams, Accidente) {
                    return Accidente.get({id : $stateParams.id});
                }]
            }
        })
        .state('accidente.modal', {
            parent: 'accidente',
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
                        modalControllerConfig: function() {
                            return new EntityModalControllerConfig ('accidente');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('accidente', null, {reload: true});
                }, function(){
                    $state.go('accidente', null, {reload: true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('accidente.new', {
            parent: 'accidente.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'AccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo accidente'
            },
            resolve: {
                entity: ['Accidente', function(Accidente) {
                    return new Accidente({
                        fechaRecepcionLlamada: null,
                        reportadoPorTercero: null,
                        nombrePersonaQueReporta: null,
                        telefonoPersonaQueReporta: null,
                        kilometro: null,
                        abscisa: null,
                        fechaLlegadaSenalizacion: null,
                        fechaLlegadaAmbulancia: null,
                        fechaLlegadaVehiculoApoyo: null,
                        fechaLlegadaFinDespeje: null,
                        otraInfraestructuraAfectada: null,
                        requiereCierreDeVia: null,
                        fechaInicioCierreVia: null,
                        fechaFinCierreVia: null,
                        entidadQueCierraVia: null,
                        tipoDeCierre: null,
                        comentario: null,
                        comentarioInterventor: null,
                        vistoBuenoInterventor: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }]
            }
        })
        .state('accidente.edit', {
            parent: 'accidente.modal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'AccidenteDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar accidente'
            },
            resolve: {
                entity: ['$stateParams', 'Accidente', function($stateParams, Accidente) {
                    return Accidente.get({id: $stateParams.id}).$promise;
                }]
            }
        })
        // .state('accidente.delete', {
        //     parent: 'accidente',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/accidente/accidente-delete-dialog.html',
        //             controller: 'AccidenteDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['Accidente', function(Accidente) {
        //                     return Accidente.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('accidente', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('accidente-confirmation', {
            parent: 'accidente.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Accidente'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-confirmation/templates/confirmation-base.html',
                    controller: 'InspeccionEntityConfirmationController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'confirmación'
            },
            resolve: {
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'Accidente', function(EntityConfirmationControllerConfig, entity, Accidente) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: Accidente,
                        entityName: 'accidente'
                    });
                }]
            }
        });
    }

})();
