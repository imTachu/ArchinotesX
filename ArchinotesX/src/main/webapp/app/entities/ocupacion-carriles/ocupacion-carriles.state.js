(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('ocupacion-carriles', {
            parent: 'entity',
            url: '/ocupacion-carriles?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Ocupación en carriles'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'OcupacionCarrilesController',
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
        // .state('ocupacion-carriles-detail', {
        //     parent: 'entity',
        //     url: '/ocupacion-carriles/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'Ocupación en carriles'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/ocupacion-carriles/ocupacion-carriles-detail.html',
        //             controller: 'OcupacionCarrilesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'OcupacionCarriles', function($stateParams, OcupacionCarriles) {
        //             return OcupacionCarriles.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('ocupacion-carriles.modal', {
            parent: 'ocupacion-carriles',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Ocupación en carriles'
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
                            return new EntityModalControllerConfig ('ocupacion_carriles');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('ocupacion-carriles', null, { reload: true });
                }, function(){
                    $state.go('ocupacion-carriles', null, { reload: true });
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('ocupacion-carriles.new', {
            parent: 'ocupacion-carriles.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Ocupacion en carriles'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'OcupacionCarrilesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Ocupación en carriles'
            },
            resolve: {
                entity: ['OcupacionCarriles', function(OcupacionCarriles) {
                    return new OcupacionCarriles({
                        fecha: null,
                        unidadFuncional: null,
                        kilometro: null,
                        abscisa: null,
                        programado:null,
                        observaciones: null,
                        incumplimientos: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }]
            }
        })
        .state('ocupacion-carriles.edit', {
            parent: 'ocupacion-carriles.modal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Ocupación en carriles'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'OcupacionCarrilesDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Ocupación en carriles'
            },
            resolve: {
                entity: ['$stateParams', 'OcupacionCarriles', function($stateParams, OcupacionCarriles) {
                    return OcupacionCarriles.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('ocupacion-carriles.delete', {
        //     parent: 'ocupacion-carriles',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/ocupacion-carriles/ocupacion-carriles-delete-dialog.html',
        //             controller: 'OcupacionCarrilesDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['OcupacionCarriles', function(OcupacionCarriles) {
        //                     return OcupacionCarriles.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('ocupacion-carriles', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('ocupacion-carriles-confirmation', {
            parent: 'ocupacion-carriles.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Confirmación - Ocupación en carriles'
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'OcupacionCarriles', function(EntityConfirmationControllerConfig, entity, OcupacionCarriles) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: OcupacionCarriles,
                        entityName: 'ocupacion-carriles'
                    });
                }]
            }
        });

    }

})();
