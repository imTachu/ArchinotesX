(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('inspeccion-desportillamiento', {
            parent: 'entity',
            url: '/inspeccion-desportillamiento?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de desportillamientos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionDesportillamientoController',
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
        // .state('inspeccion-desportillamiento-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-desportillamiento/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionDesportillamiento'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-desportillamiento/inspeccion-desportillamiento-detail.html',
        //             controller: 'InspeccionDesportillamientoDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionDesportillamiento', function($stateParams, InspeccionDesportillamiento) {
        //             return InspeccionDesportillamiento.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-desportillamiento.modal', {
            parent: 'inspeccion-desportillamiento',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de desportillamiento'
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
                            return new EntityModalControllerConfig ('inspeccion_desportillamiento');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-desportillamiento', null, { reload: true });
                }, function(){
                    $state.go('inspeccion-desportillamiento', null, { reload: true });
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-desportillamiento.new', {
            parent: 'inspeccion-desportillamiento.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionDesportillamientoDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección desportillamiento'
            },
            resolve: {
                entity: ['InspeccionDesportillamiento', function(InspeccionDesportillamiento) {
                    return new InspeccionDesportillamiento ({
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
        .state('inspeccion-desportillamiento.edit', {
            parent: 'inspeccion-desportillamiento.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionDesportillamientoDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección desportillamiento'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionDesportillamiento', function($stateParams, InspeccionDesportillamiento) {
                    return InspeccionDesportillamiento.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-desportillamiento.delete', {
        //     parent: 'inspeccion-desportillamiento',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-desportillamiento/inspeccion-desportillamiento-delete-dialog.html',
        //             controller: 'InspeccionDesportillamientoDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionDesportillamiento', function(InspeccionDesportillamiento) {
        //                     return InspeccionDesportillamiento.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-desportillamiento', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-desportillamiento-confirmation', {
            parent: 'inspeccion-desportillamiento.edit',
            url: '/confirmation',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionDesportillamiento', function(EntityConfirmationControllerConfig, entity, InspeccionDesportillamiento) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionDesportillamiento,
                        entityName: 'inspeccion-desportillamiento'
                    });
                }]
            }
        });
    }

})();
