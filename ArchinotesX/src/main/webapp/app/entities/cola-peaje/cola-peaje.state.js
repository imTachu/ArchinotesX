(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('cola-peaje', {
            parent: 'entity',
            url: '/cola-peaje?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Colas de peajes'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ColaPeajeController',
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
        // .state('cola-peaje-detail', {
        //     parent: 'entity',
        //     url: '/cola-peaje/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ColaPeaje'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/cola-peaje/cola-peaje-detail.html',
        //             controller: 'ColaPeajeDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ColaPeaje', function($stateParams, ColaPeaje) {
        //             return ColaPeaje.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('cola-peaje.modal', {
            parent: 'cola-peaje',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Colas de peajes'
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
                            return new EntityModalControllerConfig ('cola_peaje');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('cola-peaje', null, { reload: true });
                }, function(){
                    $state.go('cola-peaje', null, { reload: true });
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('cola-peaje.new', {
            parent: 'cola-peaje.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Cola-peaje'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'ColaPeajeDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Cola de peaje'
            },
            resolve: {
                entity: ['ColaPeaje', function(ColaPeaje) {
                    return new ColaPeaje({
                        fecha: null,
                        carrilesActivos: null,
                        observaciones: null,
                        incumplimientos: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }]
            }
        })
        .state('cola-peaje.edit', {
            parent: 'cola-peaje.modal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Cola de peaje'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'ColaPeajeDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Cola de peaje'
            },
            resolve: {
                entity: ['$stateParams', 'ColaPeaje', function($stateParams, ColaPeaje) {
                    return ColaPeaje.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('cola-peaje.delete', {
        //     parent: 'cola-peaje',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/cola-peaje/cola-peaje-delete-dialog.html',
        //             controller: 'ColaPeajeDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['ColaPeaje', function(ColaPeaje) {
        //                     return ColaPeaje.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('cola-peaje', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('cola-peaje-confirmation', {
            parent: 'cola-peaje.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Confirmación - Cola de peaje'
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'ColaPeaje', function(EntityConfirmationControllerConfig, entity, ColaPeaje) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: ColaPeaje,
                        entityName: 'cola-peaje'
                    });
                }]
            }
        });

    }

})();
