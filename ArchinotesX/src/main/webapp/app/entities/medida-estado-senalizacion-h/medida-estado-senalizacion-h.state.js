(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('medida-estado-senalizacion-h', {
            parent: 'estado-senalizacion-h.edit',
            url: '/medida?index&sortBy&query&count',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'MedidaEstadoSenalizacionHS'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'MedidaEstadoSenalizacionHController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label:'Medida'
            },
            params: {
                index: {
                    value: '1',
                    squash: true
                },
                sortBy: {
                    value: 'id,asc',
                    squash: true
                },
                query: null,
                count: {
                    value: paginationConstants.itemsPerPage.toString(),
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.index),
                        sort: $stateParams.sortBy,
                        predicate: PaginationUtil.parsePredicate($stateParams.sortBy),
                        ascending: PaginationUtil.parseAscending($stateParams.sortBy),
                        search: $stateParams.query,
                        size: parseInt($stateParams.count)
                    };
                }],
                estadoSenalizacionHs: ['entity', function(entity){
                    return entity;
                }],
                inspeccionEntity: ['inspeccionEntity', function(inspeccionEntity){
                    return inspeccionEntity;
                }],
                archivosListListener:['EntityListener', function(EntityListener){
                    return EntityListener.make();
                }]
            }
        })
        // .state('medida-estado-senalizacion-h-detail', {
        //     parent: 'entity',
        //     url: '/medida-estado-senalizacion-h/{id_medida_senalizacion_h}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'MedidaEstadoSenalizacionH'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/medida-estado-senalizacion-h/medida-estado-senalizacion-h-detail.html',
        //             controller: 'MedidaEstadoSenalizacionHDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'MedidaEstadoSenalizacionH', function($stateParams, MedidaEstadoSenalizacionH) {
        //             return MedidaEstadoSenalizacionH.get({id : $stateParams.id_medida_senalizacion_h});
        //         }]
        //     }
        // })
        .state('medida-estado-senalizacion-h.new', {
            parent: 'medida-estado-senalizacion-h',
            url: '/new',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'MedidaEstadoSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Nuevo'
            },
            resolve: {
                entity: ['MedidaEstadoSenalizacionH', function(MedidaEstadoSenalizacionH) {
                    return new MedidaEstadoSenalizacionH ({
                        medida: null,
                        tipoMedida: null,
                        id: null
                    });
                }], 
                estadoEntity: ['estadoSenalizacionHs', function(estadoSenalizacionHs){
                    return estadoSenalizacionHs;
                }]
            }
        })
        .state('medida-estado-senalizacion-h.edit', {
            parent: 'medida-estado-senalizacion-h',
            url: '/{id_medida_senalizacion_h}/edit',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                    controller: 'MedidaEstadoSenalizacionHDialogController',
                    controllerAs: 'vm'
                }
            },
            ncyBreadcrumb: {
                label: 'Editar'
            },
            resolve: {
                entity: ['$stateParams', 'MedidaEstadoSenalizacionH', function($stateParams, MedidaEstadoSenalizacionH) {
                    return MedidaEstadoSenalizacionH.get({id : $stateParams.id_medida_senalizacion_h});
                }],
                estadoEntity: ['estadoSenalizacionHs', function(estadoSenalizacionHs){
                    return estadoSenalizacionHs;
                }]
            }
        })
        .state('medida-estado-senalizacion-h.delete', {
            parent: 'medida-estado-senalizacion-h',
            url: '/{id_medida_senalizacion_h}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/medida-estado-senalizacion-h/medida-estado-senalizacion-h-delete-dialog.html',
                    controller: 'MedidaEstadoSenalizacionHDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['MedidaEstadoSenalizacionH', function(MedidaEstadoSenalizacionH) {
                            return MedidaEstadoSenalizacionH.get({id : $stateParams.id_medida_senalizacion_h});
                        }]
                    }
                }).result.then(function() {
                    $state.go('^');
                    archivosListListener.dispatch();
                }, function() {
                    $state.go('^');
                    archivosListListener.dispatch();
                });
            }]
        });
    }

})();
