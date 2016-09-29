(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('inspeccion-drenajes', {
            parent: 'entity',
            url: '/inspeccion-drenajes?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de drenajes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionDrenajesController',
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
        // .state('inspeccion-drenajes-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-drenajes/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionDrenajes'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-drenajes/inspeccion-drenajes-detail.html',
        //             controller: 'InspeccionDrenajesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionDrenajes', function($stateParams, InspeccionDrenajes) {
        //             return InspeccionDrenajes.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-drenajes.modal', {
            parent: 'inspeccion-drenajes',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de drenajes'
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
                            return new EntityModalControllerConfig ('inspeccion_drenajes');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-drenajes', null, { reload: true });
                }, function(){
                    $state.go('inspeccion-drenajes', null, { reload: true });
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-drenajes.new', {
            parent: 'inspeccion-drenajes.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionDrenajesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección drenajes'
            },
            resolve: {
                entity: ['InspeccionDrenajes', function(InspeccionDrenajes) {
                    return new InspeccionDrenajes ({
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
        .state('inspeccion-drenajes.edit', {
            parent: 'inspeccion-drenajes.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionDrenajesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspeccion drenajes'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionDrenajes', function($stateParams, InspeccionDrenajes) {
                    return InspeccionDrenajes.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-drenajes.delete', {
        //     parent: 'inspeccion-drenajes',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-drenajes/inspeccion-drenajes-delete-dialog.html',
        //             controller: 'InspeccionDrenajesDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionDrenajes', function(InspeccionDrenajes) {
        //                     return InspeccionDrenajes.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-drenajes', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-drenajes-confirmation', {
            parent: 'inspeccion-drenajes.edit',
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
                label: 'Confirmación'
            },
            resolve: {
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionDrenajes', function(EntityConfirmationControllerConfig, entity, InspeccionDrenajes) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionDrenajes,
                        entityName: 'inspeccion-drenajes'
                    });
                }]
            }
        });
    }

})();
