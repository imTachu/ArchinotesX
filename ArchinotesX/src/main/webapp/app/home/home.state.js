(function () {
    'use strict';

    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        })
            .state('microServiceDelete', {
                parent: 'home',
                url: '/delete-data-microservice/{id}',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQL Datasources'
                },
                onEnter: ['$stateParams', '$state', '$uibModal', 'DataMicroservice', function ($stateParams, $state, $uibModal, DataMicroservice) {
                    this.modalDialog = $uibModal.open({
                        templateUrl: 'app/home/delete-data-microservice-modal.html',
                        controller: 'DeleteMicroserviceController',
                        controllerAs: 'vm',
                        backdrop: true,
                        size: 'md',
                        resolve: {
                            entity: function () {
                                return DataMicroservice.get({ id: $stateParams.id }).$promise;
                            }
                        }
                    });
                    this.modalDialog.result.then(function () {
                        $state.go('home', null, { reload: true });
                    }, function () {
                        $state.go('home', null, {});
                    });
                }],
                onExit: function () {
                    this.modalDialog.close();
                    this.modalDialog = null;
                }
            })
            .state('microServiceNew', {
                parent: 'home',
                url: '/new-data-microservice',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQL Datasources'
                },
                onEnter: ['$state', '$uibModal', function ($state, $uibModal) {
                    this.modalDialog = $uibModal.open({
                        templateUrl: 'app/home/new-data-microservice-modal.html',
                        controller: 'NewMicroserviceController',
                        controllerAs: 'vm',
                        backdrop: true,
                        size: 'md'
                    });
                    this.modalDialog.result.then(function () {
                        $state.go('home', null, { reload: true });
                    }, function () {
                        $state.go('home', null, {});
                    });
                }],
                onExit: function () {
                    this.modalDialog.close();
                    this.modalDialog = null;
                }
            });
    }
})();
