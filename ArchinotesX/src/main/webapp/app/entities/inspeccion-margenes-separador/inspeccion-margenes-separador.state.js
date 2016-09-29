(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider.state('inspeccion-margenes-separador', {
            parent: 'entity',
            url: '/inspeccion-margenes?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de margenes separadoras'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionMargenesSeparadorController',
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
        // .state('inspeccion-margenes-separador-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-margenes-separador/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionMargenesSeparador'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-margenes-separador/inspeccion-margenes-separador-detail.html',
        //             controller: 'InspeccionMargenesSeparadorDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionMargenesSeparador', function($stateParams, InspeccionMargenesSeparador) {
        //             return InspeccionMargenesSeparador.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-margenes-separador.modal',{
            parent:'inspeccion-margenes-separador',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de margenes separadoras'
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
                            return new EntityModalControllerConfig ('inspeccion_margenes_separador');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-margenes-separador', null, {reload: true});
                }, function(){
                    $state.go('inspeccion-margenes-separador', null, {reload: true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-margenes-separador.new', {
            parent: 'inspeccion-margenes-separador.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionMargenesSeparadorDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspeccion de márgenes'
            },
            resolve: {
                entity: ['InspeccionMargenesSeparador', function(InspeccionMargenesSeparador) {
                    return new InspeccionMargenesSeparador({
                        fechaInspeccion: null,
                        fechaVerificacion: null,
                        vistoBuenoInterventor: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }]
            }
        })
        .state('inspeccion-margenes-separador.edit', {
            parent: 'inspeccion-margenes-separador.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionMargenesSeparadorDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección márgenes'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionMargenesSeparador', function($stateParams, InspeccionMargenesSeparador) {
                    return InspeccionMargenesSeparador.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-margenes-separador.delete', {
        //     parent: 'inspeccion-margenes-separador',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-margenes-separador/inspeccion-margenes-separador-delete-dialog.html',
        //             controller: 'InspeccionMargenesSeparadorDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionMargenesSeparador', function(InspeccionMargenesSeparador) {
        //                     return InspeccionMargenesSeparador.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-margenes-separador', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-margenes-separador-confirmation', {
            parent: 'inspeccion-margenes-separador.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Confirmación'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-confirmation/templates/confirmation-base.html',
                    controller: 'EntityConfirmationController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'confirmación'
            },
            resolve: {
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionMargenesSeparador', function(EntityConfirmationControllerConfig, entity, InspeccionMargenesSeparador) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionMargenesSeparador,
                        entityName: 'inspeccion-margenes-separador'
                    });
                }]
            }
        });
    }

})();
