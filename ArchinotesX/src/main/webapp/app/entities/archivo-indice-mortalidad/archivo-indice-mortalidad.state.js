(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-indice-mortalidad', {
            parent: 'indice-mortalidad.edit',
            url: '/archivo?filesPage&filesSort&filesSearch&filesCount',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Archivos del índice de mortalidad'
            },
            ncyBreadcrumb: {
                label: 'Archivos adjuntos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ArchivoIndiceMortalidadController',
                    controllerAs: 'vm'
                }
            },
            params: {
                filesPage: {
                    value: '1',
                    squash: true
                },
                filesSort: {
                    value: 'id,asc',
                    squash: true
                },
                filesSearch: null,
                filesCount: {
                    value: paginationConstants.itemsPerPage.toString(),
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.filesPage),
                        sort: $stateParams.filesSort,
                        predicate: PaginationUtil.parsePredicate($stateParams.filesSort),
                        ascending: PaginationUtil.parseAscending($stateParams.filesSort),
                        search: $stateParams.filesSearch,
                        size: parseInt($stateParams.filesCount)
                    };
                }],
                indiceMortalidad: ['entity', function(entity) {
                    return entity;
                }],
                archivosListListener:['EntityListener', function(EntityListener){
                    return EntityListener.make();
                }]
            }
        })
        // .state('archivo-indice-mortalidad-detail', {
        //     parent: 'entity',
        //     url: '/archivo-indice-mortalidad/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoIndiceMortalidad'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-indice-mortalidad/archivo-indice-mortalidad-detail.html',
        //             controller: 'ArchivoIndiceMortalidadDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoIndiceMortalidad', function($stateParams, ArchivoIndiceMortalidad) {
        //             return ArchivoIndiceMortalidad.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-indice-mortalidad.new', {
        //     parent: 'archivo-indice-mortalidad',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-indice-mortalidad/archivo-indice-mortalidad-dialog.html',
        //             controller: 'ArchivoIndiceMortalidadDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: function () {
        //                     return {
        //                         nombre: null,
        //                         extension: null,
        //                         fechaDeRegistro: null,
        //                         ubicacion: null,
        //                         bucket: null,
        //                         keyS3: null,
        //                         idVersion: null,
        //                         id: null
        //                     };
        //                 }
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-indice-mortalidad', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-indice-mortalidad');
        //         });
        //     }]
        // })
        // .state('archivo-indice-mortalidad.edit', {
        //     parent: 'archivo-indice-mortalidad',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-indice-mortalidad/archivo-indice-mortalidad-dialog.html',
        //             controller: 'ArchivoIndiceMortalidadDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoIndiceMortalidad', function(ArchivoIndiceMortalidad) {
        //                     return ArchivoIndiceMortalidad.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-indice-mortalidad', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-indice-mortalidad.delete', {
            parent: 'archivo-indice-mortalidad',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-indice-mortalidad/archivo-indice-mortalidad-delete-dialog.html',
                    controller: 'ArchivoIndiceMortalidadDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoIndiceMortalidad', function(ArchivoIndiceMortalidad) {
                            return ArchivoIndiceMortalidad.get({id : $stateParams.id_archivo});
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
        })
        .state('archivo-indice-mortalidad.upload-file', {
            parent: 'archivo-indice-mortalidad',
            url: '/upload-file',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['entity', '$stateParams', '$state', '$uibModal', 'ENTITY_STATES', '$rootScope', 'archivosListListener', 'EntityFileUploadControllerConfig', function(entity, $stateParams, $state, $uibModal, ENTITY_STATES, $rootScope, archivosListListener, EntityFileUploadControllerConfig){

                $uibModal.open({
                    templateUrl: 'app/entities/_components/entity-file-uploader/templates/modal-file-upload.html',
                    controller: 'EntityFileUploadController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        controllerConfig:function(){
                            return new EntityFileUploadControllerConfig({
                                resourceURL:'api/archivo-indice-mortalidads',
                                uploadSuccessEventName:'siccApp:archivoIndiceMortalidadUpdate',
                                fileParamName:'archivoIndiceMortalidad',
                                requestParams:{
                                    idArchivoIndiceMortalidad:"",
                                    idIndiceMortalidad:$stateParams.id
                                }
                            });
                        }
                    }
                }).result.then(function(){
                    $state.go('^');
                    archivosListListener.dispatch();
                }, function(){
                    $state.go('^');
                    archivosListListener.dispatch();
                });
            }]
        });
    }

})();
