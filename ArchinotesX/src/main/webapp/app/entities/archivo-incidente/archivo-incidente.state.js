(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-incidente', {
            parent: 'incidente.edit',
            url: '/archivo?filesPage&filesSort&filesSearch&filesCount',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Archivos del incidente'
            },
            ncyBreadcrumb: {
                label: 'Archivos adjuntos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ArchivoIncidenteController',
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
                incidente: ['entity', function(entity){
                    return entity;
                }],
                archivosListListener:['EntityListener', function(EntityListener){
                    return EntityListener.make();
                }]
            }
        })
        // .state('archivo-incidente-detail', {
        //     parent: 'incidente.modal',
        //     url: '/archivo-incidente/{id_archivo}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoIncidente'
        //     },
        //     views: {
        //         'incidente-dialog-content@': {
        //             templateUrl: 'app/entities/archivo-incidente/archivo-incidente-detail.html',
        //             controller: 'ArchivoIncidenteDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoIncidente', function($stateParams, ArchivoIncidente) {
        //             return ArchivoIncidente.get({id : $stateParams.id_archivo});
        //         }]
        //     }
        // })
        // .state('archivo-incidente.new', {
        //     parent: 'archivo-incidente',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
        //     },
        //     views: {
        //         'incidente-dialog-content@': {
        //             templateUrl: 'app/entities/archivo-incidente/archivo-incidente-dialog.html',
        //             controller: 'ArchivoIncidenteDialogController',
        //             controllerAs: 'vm',
        //         }
        //     },
        //     resolve: {
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
        //                 },
        //                 incidente: ['$stateParams', 'PaginationUtil', 'Incidente', function($stateParams, PaginationUtil, Incidente){
        //                     return Incidente.get({id: $stateParams.id});
        //                 }]
        //             }
        // })
        // .state('archivo-incidente.edit', {
        //     parent: 'archivo-incidente',
        //     url: '/{id_archivo}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
        //     },
        //     views: {
        //         'incidente-dialog-content@': {
        //             templateUrl: 'app/entities/archivo-incidente/archivo-incidente-dialog.html',
        //             controller: 'ArchivoIncidenteDialogController',
        //             controllerAs: 'vm',
        //         }
        //     },
        //     resolve: {
        //                 entity: ['$stateParams', 'ArchivoIncidente', function($stateParams, ArchivoIncidente) {
        //                     return ArchivoIncidente.get({id : $stateParams.id_archivo});
        //                 }],
        //                 incidente: ['$stateParams', 'PaginationUtil', 'Incidente', function($stateParams, PaginationUtil, Incidente){
        //                     return Incidente.get({id: $stateParams.id});
        //                 }]
        //             }
        // })
        .state('archivo-incidente.delete', {
            parent: 'archivo-incidente',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-incidente/archivo-incidente-delete-dialog.html',
                    controller: 'ArchivoIncidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoIncidente', function(ArchivoIncidente) {
                            return ArchivoIncidente.get({id : $stateParams.id_archivo});
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
        .state('archivo-incidente.upload-file', {
            parent: 'archivo-incidente',
            url: '/upload-file',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
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
                                resourceURL:'api/archivo-incidentes',
                                uploadSuccessEventName:'archinotesxApp:archivoIncidenteUpdate',
                                fileParamName:'archivoIncidente',
                                requestParams:{
                                    idArchivoIncidente:"",
                                    idIncidente:$stateParams.id
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
