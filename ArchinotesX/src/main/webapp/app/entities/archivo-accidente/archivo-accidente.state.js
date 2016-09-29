(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
        .state('archivo-accidente', {
            parent: 'accidente.edit',
            url: '/archivo?filesPage&filesSort&filesSearch&filesCount',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
                pageTitle: 'Archivos del accidente'
            },
            ncyBreadcrumb: {
                label: 'Archivos adjuntos'
            },
            views: {
                'dialog-content@': {
                    templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                    controller: 'ArchivoAccidenteController',
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
                accidente: ['entity', function(entity){
                    return entity;
                }],
                accidenteEntity: ['entity', function(entity){
                    return entity;
                }],
                archivosListListener:['EntityListener', function(EntityListener){
                    return EntityListener.make();
                }]
            }
        })
        // .state('archivo-accidente-detail', {
        //     parent: 'entity',
        //     url: '/archivo-accidente/{id_archivo}',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR'],
        //         pageTitle: 'ArchivoAccidente'
        //     },
        //     views: {
        //         'accidente-dialog-content@': {
        //             templateUrl: 'app/entities/archivo-accidente/archivo-accidente-detail.html',
        //             controller: 'ArchivoAccidenteDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve: {
        //         entity: ['$stateParams', 'ArchivoAccidente', function($stateParams, ArchivoAccidente) {
        //             return ArchivoAccidente.get({id : $stateParams.id_archivo});
        //         }]
        //     }
        // })
        // .state('archivo-accidente.new', {
        //     parent: 'archivo-accidente',
        //     url: '/new',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
        //     },
        //     views: {
        //         'accidente-dialog-content@':{
        //             templateUrl: 'app/entities/archivo-accidente/archivo-accidente-dialog.html',
        //             controller: 'ArchivoAccidenteDialogController',
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
        //                 accidente: ['$stateParams', 'Accidente', function($stateParams, Accidente){
        //                     return Accidente.get({id: $stateParams.id}).$promise;
        //                 }]
        //             }
        // })
        // .state('archivo-accidente.edit', {
        //     parent: 'archivo-accidente',
        //     url: '/{id_archivo}/edit',
        //     data: {
        //         authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
        //     },
        //     views: {
        //         'accidente-dialog-content@':{
        //             templateUrl: 'app/entities/archivo-accidente/archivo-accidente-dialog.html',
        //             controller: 'ArchivoAccidenteDialogController',
        //             controllerAs: 'vm',
        //         }
        //     },
        //     resolve: {
        //                 entity: ['$stateParams', 'ArchivoAccidente', function($stateParams, ArchivoAccidente) {
        //                     return ArchivoAccidente.get({id : $stateParams.id_archivo}).$promise;
        //                 }],
        //                 accidente: ['$stateParams', 'Accidente', function($stateParams, Accidente){
        //                     return Accidente.get({id: $stateParams.id}).$promise;
        //                 }]
        //             }
        // })
        .state('archivo-accidente.delete', {
            parent: 'archivo-accidente',
            url: '/{id_archivo}/delete',
            data: {
                authorities: ['ROLE_OPERADOR1', 'ROLE_SUPERVISOR']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', 'archivosListListener', function($stateParams, $state, $uibModal, archivosListListener) {
                $uibModal.open({
                    templateUrl: 'app/entities/archivo-accidente/archivo-accidente-delete-dialog.html',
                    controller: 'ArchivoAccidenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ArchivoAccidente', function(ArchivoAccidente) {
                            return ArchivoAccidente.get({id : $stateParams.id_archivo});
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
        .state('archivo-accidente.upload-file', {
            parent: 'archivo-accidente',
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
                                resourceURL:'api/archivo-accidentes',
                                uploadSuccessEventName:'archinotesxApp:archivoAccidenteUpdate',
                                fileParamName:'archivoAccidente',
                                requestParams:{
                                    idArchivoAccidente:"",
                                    idAccidente:$stateParams.id
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
