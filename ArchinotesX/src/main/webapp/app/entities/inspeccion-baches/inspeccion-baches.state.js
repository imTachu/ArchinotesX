(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('inspeccion-baches', {
            parent: 'entity',
            url: '/inspeccion-baches?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de baches'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionBachesController',
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
        // .state('inspeccion-baches-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-baches/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionBaches'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-baches/inspeccion-baches-detail.html',
        //             controller: 'InspeccionBachesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionBaches', function($stateParams, InspeccionBaches) {
        //             return InspeccionBaches.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-baches.modal', {
            parent: 'inspeccion-baches',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de Baches'
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
                            return new EntityModalControllerConfig ('inspeccion_baches');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-baches', null, {reload: true});
                }, function(){
                    $state.go('inspeccion-baches', null, {reload: true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-baches.new', {
            parent: 'inspeccion-baches.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionBachesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección baches'
            },
            resolve: {
                entity: ['InspeccionBaches', function(InspeccionBaches) {
                    return new InspeccionBaches({
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
        .state('inspeccion-baches.edit', {
            parent: 'inspeccion-baches.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionBachesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección baches'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionBaches', function($stateParams, InspeccionBaches) {
                    return InspeccionBaches.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-baches.delete', {
        //     parent: 'inspeccion-baches',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-baches/inspeccion-baches-delete-dialog.html',
        //             controller: 'InspeccionBachesDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionBaches', function(InspeccionBaches) {
        //                     return InspeccionBaches.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-baches', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-baches-confirmation', {
            parent: 'inspeccion-baches.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionBaches', function(EntityConfirmationControllerConfig, entity, InspeccionBaches) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionBaches,
                        entityName: 'inspeccion-baches'
                    });
                }]
            }
        });
    }

})();
