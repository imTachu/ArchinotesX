(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-inspeccion-barrera', {
            parent: 'estado-barrera-contencion.edit',
            url: '/archivo?filesPage&filesSort&filesSearch&filesCount',
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
                    controller: 'ArchivoInspeccionBarreraController',
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
                estadoBarreraContencion: ['entity', function(entity){
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
        // .state('archivo-inspeccion-barrera-detail', {
        //     parent: 'entity',
        //     url: '/archivo-inspeccion-barrera/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoInspeccionBarrera'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-inspeccion-barrera/archivo-inspeccion-barrera-detail.html',
        //             controller: 'ArchivoInspeccionBarreraDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoInspeccionBarrera', function($stateParams, ArchivoInspeccionBarrera) {
        //             return ArchivoInspeccionBarrera.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-inspeccion-barrera.new', {
        //     parent: 'archivo-inspeccion-barrera',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-barrera/archivo-inspeccion-barrera-dialog.html',
        //             controller: 'ArchivoInspeccionBarreraDialogController',
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
        //             $state.go('archivo-inspeccion-barrera', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-inspeccion-barrera');
        //         });
        //     }]
        // })
        // .state('archivo-inspeccion-barrera.edit', {
        //     parent: 'archivo-inspeccion-barrera',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-barrera/archivo-inspeccion-barrera-dialog.html',
        //             controller: 'ArchivoInspeccionBarreraDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoInspeccionBarrera', function(ArchivoInspeccionBarrera) {
        //                     return ArchivoInspeccionBarrera.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-inspeccion-barrera', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-inspeccion-barrera.delete', {
            parent: 'archivo-inspeccion-barrera',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-inspeccion-barrera/archivo-inspeccion-barrera-delete-dialog.html',
                    controller: 'ArchivoInspeccionBarreraDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoInspeccionBarrera', function(ArchivoInspeccionBarrera) {
                            return ArchivoInspeccionBarrera.get({id : $stateParams.id_archivo});
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
        .state('archivo-inspeccion-barrera.upload-file', {
            parent:'archivo-inspeccion-barrera',
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
                                resourceURL:'api/archivo-inspeccion-barreras',
                                uploadSuccessEventName:'siccApp:archivoInspeccionBarreraUpdate',
                                fileParamName:'archivo',
                                requestParams:{
                                    idArchivo:"",
                                    idEstado:$stateParams.id_estado_barrera_contencion
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
