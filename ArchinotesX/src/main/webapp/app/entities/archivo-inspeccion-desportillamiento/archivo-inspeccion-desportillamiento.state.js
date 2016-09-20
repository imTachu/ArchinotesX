(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-inspeccion-desportillamiento', {
            parent: 'estado-desportillamiento.edit',
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
                    controller: 'ArchivoInspeccionDesportillamientoController',
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
                estadoDesportillamientos: ['entity', function(entity){
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
        // .state('archivo-inspeccion-desportillamiento-detail', {
        //     parent: 'entity',
        //     url: '/archivo-inspeccion-desportillamiento/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoInspeccionDesportillamiento'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-inspeccion-desportillamiento/archivo-inspeccion-desportillamiento-detail.html',
        //             controller: 'ArchivoInspeccionDesportillamientoDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoInspeccionDesportillamiento', function($stateParams, ArchivoInspeccionDesportillamiento) {
        //             return ArchivoInspeccionDesportillamiento.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-inspeccion-desportillamiento.new', {
        //     parent: 'archivo-inspeccion-desportillamiento',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-desportillamiento/archivo-inspeccion-desportillamiento-dialog.html',
        //             controller: 'ArchivoInspeccionDesportillamientoDialogController',
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
        //             $state.go('archivo-inspeccion-desportillamiento', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-inspeccion-desportillamiento');
        //         });
        //     }]
        // })
        // .state('archivo-inspeccion-desportillamiento.edit', {
        //     parent: 'archivo-inspeccion-desportillamiento',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-desportillamiento/archivo-inspeccion-desportillamiento-dialog.html',
        //             controller: 'ArchivoInspeccionDesportillamientoDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoInspeccionDesportillamiento', function(ArchivoInspeccionDesportillamiento) {
        //                     return ArchivoInspeccionDesportillamiento.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-inspeccion-desportillamiento', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-inspeccion-desportillamiento.delete', {
            parent: 'archivo-inspeccion-desportillamiento',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-inspeccion-desportillamiento/archivo-inspeccion-desportillamiento-delete-dialog.html',
                    controller: 'ArchivoInspeccionDesportillamientoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoInspeccionDesportillamiento', function(ArchivoInspeccionDesportillamiento) {
                            return ArchivoInspeccionDesportillamiento.get({id : $stateParams.id_archivo});
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
        .state('archivo-inspeccion-desportillamiento.upload-file', {
            parent: 'archivo-inspeccion-desportillamiento',
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
                                resourceURL:'api/archivo-inspeccion-desportillamientos',
                                uploadSuccessEventName:'siccApp:archivoInspeccionDesportillamientoUpdate',
                                fileParamName:'archivo',
                                requestParams:{
                                    idArchivo:"",
                                    idEstado:$stateParams.id_estado_desportillamiento
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
