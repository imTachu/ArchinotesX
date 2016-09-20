(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-inspeccion-baches', {
            parent: 'estado-baches.edit',
            url: '/archivo?filesPage&filesSortBy&filesSearch&filesCount',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
                pageTitle: 'Archivos del estado de inspección'
            },
            ncyBreadcrumb: {
                label: 'Archivos adjuntos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ArchivoInspeccionBachesController',
                    controllerAs: 'vm'
                }
            },
            params: {
                filesPage: {
                    value: '1'
                },
                filesSortBy: {
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
                        sort: $stateParams.filesSortBy,
                        predicate: PaginationUtil.parsePredicate($stateParams.filesSortBy),
                        ascending: PaginationUtil.parseAscending($stateParams.filesSortBy),
                        search: $stateParams.filesSearch,
                        size: parseInt($stateParams.filesCount)
                    };
                }],
                estadoBaches: ['entity', function(entity){
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
        // .state('archivo-inspeccion-baches-detail', {
        //     parent: 'entity',
        //     url: '/archivo-inspeccion-baches/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoInspeccionBaches'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-inspeccion-baches/archivo-inspeccion-baches-detail.html',
        //             controller: 'ArchivoInspeccionBachesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoInspeccionBaches', function($stateParams, ArchivoInspeccionBaches) {
        //             return ArchivoInspeccionBaches.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-inspeccion-baches.new', {
        //     parent: 'archivo-inspeccion-baches',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-baches/archivo-inspeccion-baches-dialog.html',
        //             controller: 'ArchivoInspeccionBachesDialogController',
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
        //             $state.go('archivo-inspeccion-baches', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-inspeccion-baches');
        //         });
        //     }]
        // })
        // .state('archivo-inspeccion-baches.edit', {
        //     parent: 'archivo-inspeccion-baches',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-baches/archivo-inspeccion-baches-dialog.html',
        //             controller: 'ArchivoInspeccionBachesDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoInspeccionBaches', function(ArchivoInspeccionBaches) {
        //                     return ArchivoInspeccionBaches.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-inspeccion-baches', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-inspeccion-baches.delete', {
            parent: 'archivo-inspeccion-baches',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-inspeccion-baches/archivo-inspeccion-baches-delete-dialog.html',
                    controller: 'ArchivoInspeccionBachesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoInspeccionBaches', function(ArchivoInspeccionBaches) {
                            return ArchivoInspeccionBaches.get({id : $stateParams.id_archivo});
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
        .state('archivo-inspeccion-baches.upload-file', {
            parent: 'archivo-inspeccion-baches',
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
                                resourceURL:'api/archivo-inspeccion-baches',
                                uploadSuccessEventName:'siccApp:archivoInspeccionBachesUpdate',
                                fileParamName:'archivo',
                                requestParams:{
                                    idArchivo:"",
                                    idEstado:$stateParams.id_estado_baches
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
