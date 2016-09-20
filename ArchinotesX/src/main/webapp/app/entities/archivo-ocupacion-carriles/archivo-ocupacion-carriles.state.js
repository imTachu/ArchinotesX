(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-ocupacion-carriles', {
            parent: 'ocupacion-carriles.edit',
            url: '/archivo?filesPage&filesSort&filesSearch&filesCount',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Archivos de ocupación de carriles'
            },
            ncyBreadcrumb: {
                label: 'Archivos adjuntos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ArchivoOcupacionCarrilesController',
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
                ocupacionCarriles: ['entity', function(entity) {
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
        // .state('archivo-ocupacion-carriles-detail', {
        //     parent: 'entity',
        //     url: '/archivo-ocupacion-carriles/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoOcupacionCarriles'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-ocupacion-carriles/archivo-ocupacion-carriles-detail.html',
        //             controller: 'ArchivoOcupacionCarrilesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoOcupacionCarriles', function($stateParams, ArchivoOcupacionCarriles) {
        //             return ArchivoOcupacionCarriles.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-ocupacion-carriles.new', {
        //     parent: 'archivo-ocupacion-carriles',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-ocupacion-carriles/archivo-ocupacion-carriles-dialog.html',
        //             controller: 'ArchivoOcupacionCarrilesDialogController',
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
        //             $state.go('archivo-ocupacion-carriles', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-ocupacion-carriles');
        //         });
        //     }]
        // })
        // .state('archivo-ocupacion-carriles.edit', {
        //     parent: 'archivo-ocupacion-carriles',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-ocupacion-carriles/archivo-ocupacion-carriles-dialog.html',
        //             controller: 'ArchivoOcupacionCarrilesDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoOcupacionCarriles', function(ArchivoOcupacionCarriles) {
        //                     return ArchivoOcupacionCarriles.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-ocupacion-carriles', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-ocupacion-carriles.delete', {
            parent: 'archivo-ocupacion-carriles',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-ocupacion-carriles/archivo-ocupacion-carriles-delete-dialog.html',
                    controller: 'ArchivoOcupacionCarrilesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoOcupacionCarriles', function(ArchivoOcupacionCarriles) {
                            return ArchivoOcupacionCarriles.get({id : $stateParams.id_archivo});
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
        .state('archivo-ocupacion-carriles.upload-file', {
            parent: 'archivo-ocupacion-carriles',
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
                                resourceURL:'api/archivo-ocupacion-carriles',
                                uploadSuccessEventName:'siccApp:archivoOcupacionCarrilesUpdate',
                                fileParamName:'archivo',
                                requestParams:{
                                    idArchivoOcupacionCarriles:"",
                                    idOcupacionCarriles:$stateParams.id
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
