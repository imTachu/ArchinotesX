(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('inspeccion-senalizacion-v', {
            parent: 'entity',
            url: '/inspeccion-senalizacion-v?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de señalizaciones verticales'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionSenalizacionVController',
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
        // .state('inspeccion-senalizacion-v-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-senalizacion-v/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionSenalizacionV'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-senalizacion-v/inspeccion-senalizacion-v-detail.html',
        //             controller: 'InspeccionSenalizacionVDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionSenalizacionV', function($stateParams, InspeccionSenalizacionV) {
        //             return InspeccionSenalizacionV.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-senalizacion-v.modal', {
            parent: 'inspeccion-senalizacion-v',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de señalizaciones verticales'
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
                            return new EntityModalControllerConfig ('inspeccion_senalizacion_v');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-senalizacion-v', null, { reload: true});
                }, function(){
                    $state.go('inspeccion-senalizacion-v', null, { reload: true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-senalizacion-v.new', {
            parent: 'inspeccion-senalizacion-v.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@':{
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionSenalizacionVDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección señalización vertical'
            },
            resolve: {
                entity: ['InspeccionSenalizacionV', function(InspeccionSenalizacionV) {
                    return new InspeccionSenalizacionV ({
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
        .state('inspeccion-senalizacion-v.edit', {
            parent: 'inspeccion-senalizacion-v.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@':{
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionSenalizacionVDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Inspección señalización vertical'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionSenalizacionV', function($stateParams, InspeccionSenalizacionV) {
                    return InspeccionSenalizacionV.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-senalizacion-v.delete', {
        //     parent: 'inspeccion-senalizacion-v',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-senalizacion-v/inspeccion-senalizacion-v-delete-dialog.html',
        //             controller: 'InspeccionSenalizacionVDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionSenalizacionV', function(InspeccionSenalizacionV) {
        //                     return InspeccionSenalizacionV.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-senalizacion-v', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-senalizacion-v-confirmation', {
            parent: 'inspeccion-senalizacion-v.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionSenalizacionV', function(EntityConfirmationControllerConfig, entity, InspeccionSenalizacionV) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionSenalizacionV,
                        entityName: 'inspeccion-senalizacion-v'
                    });
                }]
            }
        });
    }

})();
