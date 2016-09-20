(function() {
    'use strict';

    angular
        .module('siccApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-inspeccion-drenajes', {
            parent: 'estado-drenajes.edit',
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
                    controller: 'ArchivoInspeccionDrenajesController',
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
                estadoDrenajes: ['entity', function(entity){
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
        // .state('archivo-inspeccion-drenajes-detail', {
        //     parent: 'entity',
        //     url: '/archivo-inspeccion-drenajes/{id}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoInspeccionDrenajes'
        //     },
        //     views: {
        //         'content@': {
        //             templateUrl: 'app/entities/archivo-inspeccion-drenajes/archivo-inspeccion-drenajes-detail.html',
        //             controller: 'ArchivoInspeccionDrenajesDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoInspeccionDrenajes', function($stateParams, ArchivoInspeccionDrenajes) {
        //             return ArchivoInspeccionDrenajes.get({id : $stateParams.id});
        //         }]
        //     }
        // })
        // .state('archivo-inspeccion-drenajes.new', {
        //     parent: 'archivo-inspeccion-drenajes',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-drenajes/archivo-inspeccion-drenajes-dialog.html',
        //             controller: 'ArchivoInspeccionDrenajesDialogController',
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
        //             $state.go('archivo-inspeccion-drenajes', null, { reload: true });
        //         }, function() {
        //             $state.go('archivo-inspeccion-drenajes');
        //         });
        //     }]
        // })
        // .state('archivo-inspeccion-drenajes.edit', {
        //     parent: 'archivo-inspeccion-drenajes',
        //     url: '/{id}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
        //     },
        //     onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
        //         $uibModal.open({
        //             templateUrl: 'app/entities/archivo-inspeccion-drenajes/archivo-inspeccion-drenajes-dialog.html',
        //             controller: 'ArchivoInspeccionDrenajesDialogController',
        //             controllerAs: 'vm',
        //             backdrop: 'static',
        //             size: 'lg',
        //             resolve: {
        //                 entity: ['ArchivoInspeccionDrenajes', function(ArchivoInspeccionDrenajes) {
        //                     return ArchivoInspeccionDrenajes.get({id : $stateParams.id});
        //                 }]
        //             }
        //         }).result.then(function() {
        //             $state.go('archivo-inspeccion-drenajes', null, { reload: true });
        //         }, function() {
        //             $state.go('^');
        //         });
        //     }]
        // })
        .state('archivo-inspeccion-drenajes.delete', {
            parent: 'archivo-inspeccion-drenajes',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR2', 'ROLE_INTERVENTOR', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-inspeccion-drenajes/archivo-inspeccion-drenajes-delete-dialog.html',
                    controller: 'ArchivoInspeccionDrenajesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoInspeccionDrenajes', function(ArchivoInspeccionDrenajes) {
                            return ArchivoInspeccionDrenajes.get({id : $stateParams.id_archivo});
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
        .state('archivo-inspeccion-drenajes.upload-file', {
            parent: 'archivo-inspeccion-drenajes',
            url:'/upload-file',
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
                                resourceURL:'api/archivo-inspeccion-drenajes',
                                uploadSuccessEventName:'siccApp:archivoInspeccionDrenajesUpdate',
                                fileParamName:'archivo',
                                requestParams:{
                                    idArchivo:"",
                                    idEstado:$stateParams.id_estado_drenajes
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
