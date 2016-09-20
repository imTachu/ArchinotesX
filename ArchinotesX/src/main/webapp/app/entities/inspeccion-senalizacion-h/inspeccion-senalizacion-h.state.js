(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('inspeccion-senalizacion-h', {
            parent: 'entity',
            url: '/inspeccion-senalizacion-h?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspecciones de señalizaciones horizontales'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'InspeccionSenalizacionHController',
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
        // .state('inspeccion-senalizacion-h-detail', {
        //     parent: 'entity',
        //     url: '/inspeccion-senalizacion-h/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'InspeccionSenalizacionH'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/inspeccion-senalizacion-h/inspeccion-senalizacion-h-detail.html',
        //             controller: 'InspeccionSenalizacionHDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionSenalizacionH', function($stateParams, InspeccionSenalizacionH) {
        //             return InspeccionSenalizacionH.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('inspeccion-senalizacion-h.modal', {
            parent: 'inspeccion-senalizacion-h',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Inspección de señalizaciones horizontales'
            },
            abstract: true,
            onEnter: ['$stateParams', '$state', '$uibModal', 'EntityModalControllerConfig', function($stateParams, $state, $uibModal, EntityModalControllerConfig) {
                this.modalDialog=$uibModal.open({
                    templateUrl: 'app/entities/_components/entity-modal/templates/modal-base.html',
                    controller: 'EntityModalController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        modalControllerConfig: function () {
                            return new EntityModalControllerConfig ('inspeccion_senalizacion_h');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('inspeccion-senalizacion-h', null, {reload: true});
                }, function(){
                    $state.go('inspeccion-senalizacion-h', null, {reload: true});
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('inspeccion-senalizacion-h.new', {
            parent: 'inspeccion-senalizacion-h.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label:'Inspección señalización horizontal'
            },
            resolve: {
                entity: ['InspeccionSenalizacionH', function(InspeccionSenalizacionH) {
                    return new InspeccionSenalizacionH ({
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
        .state('inspeccion-senalizacion-h.edit', {
            parent: 'inspeccion-senalizacion-h.modal',
            url: '/{id}',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'InspeccionSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label:'Inspección señalización horizontal'
            },
            resolve: {
                entity: ['$stateParams', 'InspeccionSenalizacionH', function($stateParams, InspeccionSenalizacionH) {
                    return InspeccionSenalizacionH.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('inspeccion-senalizacion-h.view', {
        //     parent: 'inspeccion-senalizacion-h.modal',
        //     url: '/{id}/view',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']   
        //     },
        //     views: {
        //         'dialog-content@': {
        //             templateUrl: 'app/entities/inspeccion-senalizacion-h/inspeccion-senalizacion-h-dialog.html',
        //             controller: 'InspeccionSenalizacionHDialogController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     ncyBreadcrumb: {
        //         label:'Inspección señalización horizontal'
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'InspeccionSenalizacionH', function($stateParams, InspeccionSenalizacionH) {
        //             return InspeccionSenalizacionH.get({id : $stateParams.id}).$promise;
        //         }]
        //     }
        // })
        // .state('inspeccion-senalizacion-h.delete', {
        //     parent: 'inspeccion-senalizacion-h',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/inspeccion-senalizacion-h/inspeccion-senalizacion-h-delete-dialog.html',
        //             controller: 'InspeccionSenalizacionHDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['InspeccionSenalizacionH', function(InspeccionSenalizacionH) {
        //                     return InspeccionSenalizacionH.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('inspeccion-senalizacion-h', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('inspeccion-senalizacion-h-confirmation', {
            parent: 'inspeccion-senalizacion-h.edit',
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'InspeccionSenalizacionH', function(EntityConfirmationControllerConfig, entity, InspeccionSenalizacionH) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: InspeccionSenalizacionH,
                        entityName: 'inspeccion-senalizacion-h'
                    });
                }]
            }
        });
       
    }

})();
