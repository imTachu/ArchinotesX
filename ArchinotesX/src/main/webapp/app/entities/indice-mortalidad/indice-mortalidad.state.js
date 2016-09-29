(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('indice-mortalidad', {
            parent: 'entity',
            url: '/indice-mortalidad?page&sort&search&size',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Índices de mortalidad'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'IndiceMortalidadController',
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
        // .state('indice-mortalidad-detail', {
        //     parent: 'entity',
        //     url: '/indice-mortalidad/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'IndiceMortalidad'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/indice-mortalidad/indice-mortalidad-detail.html',
        //             controller: 'IndiceMortalidadDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'IndiceMortalidad', function($stateParams, IndiceMortalidad) {
        //             return IndiceMortalidad.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        .state('indice-mortalidad.modal', {
            parent: 'indice-mortalidad',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Índices de mortalidad'
            },
            abstract: true,
            onEnter: ['$stateParams', '$state', '$uibModal', 'EntityModalControllerConfig',  function($stateParams, $state, $uibModal, EntityModalControllerConfig){
                this.modalDialog=$uibModal.open({
                    templateUrl: 'app/entities/_components/entity-modal/templates/modal-base.html',
                    controller: 'EntityModalController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        modalControllerConfig: function () {
                            return new EntityModalControllerConfig ('indice_mortalidad');
                        }
                    }
                });
                this.modalDialog.result.then(function(){
                    $state.go('indice-mortalidad', null, { reload: true });
                }, function(){
                    $state.go('indice-mortalidad', null, { reload: true });
                });
            }],
            onExit:function(){
                this.modalDialog.close();
                this.modalDialog=null;
            }
        })
        .state('indice-mortalidad.new', {
            parent: 'indice-mortalidad.modal',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Crear - Índice de mortalidad'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IndiceMortalidadDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Indice mortalidad'
            },
            resolve: {
                entity: ['IndiceMortalidad', function(IndiceMortalidad) {
                    return new IndiceMortalidad({
                        fechaInicial: null,
                        fechaFinal: null,
                        cantidadTrafico: null,
                        numeroVictimasFatales: null,
                        indiceMortalidad: null,
                        vistoBuenoInterventor: null,
                        cumple: null,
                        estado: null,
                        id: null
                    });
                }]
            }
        })
        .state('indice-mortalidad.edit', {
            parent: 'indice-mortalidad.modal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Editar - Índice de mortalidad'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'IndiceMortalidadDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Indice mortalidad'
            },
            resolve: {
                entity: ['$stateParams', 'IndiceMortalidad', function($stateParams, IndiceMortalidad) {
                    return IndiceMortalidad.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        // .state('indice-mortalidad.delete', {
        //     parent: 'indice-mortalidad',
        //     url: '/{id}/delete',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/indice-mortalidad/indice-mortalidad-delete-dialog.html',
        //             controller: 'IndiceMortalidadDeleteController',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             resolve: {
        //                 entity: ['IndiceMortalidad', function(IndiceMortalidad) {
        //                     return IndiceMortalidad.get({id : $stateParams.id}).$promise;
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('indice-mortalidad', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('indice-mortalidad-confirmation', {
            parent: 'indice-mortalidad.edit',
            url: '/confirmacion',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Confirmación - Índice de mortalidad'
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
                controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'IndiceMortalidad', function(EntityConfirmationControllerConfig, entity, IndiceMortalidad) {
                    return new EntityConfirmationControllerConfig({
                        entity: entity,
                        entityService: IndiceMortalidad,
                        entityName: 'indice-mortalidad'
                    });
                }]
            }

        });
    }

})();
